import {useMutation} from "@apollo/client";
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import Format from '../helpers/formatter.js';
import { ADD_RESERVATION, SEND_EMAIL_CONFIRMATION } from '../controllers/mutations';
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading.js";

const CheckoutFormForDp = ({resInfo}) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [sendEmailConfirmation, {emailData}] = useMutation(SEND_EMAIL_CONFIRMATION);
  const [addReservation, {loading, error, data}] = useMutation(ADD_RESERVATION);

  const reservation = resInfo;
  const property = resInfo.property;
  const customer = resInfo.customer;

  const downPaymentAmount = Format.showUSDollar(parseFloat(reservation.totalPrice.replace(/[$,]/g,""))*.50);
  const formattedCheckIn = Format.dateFormat(reservation.beginDate);
  const formattedCheckOut = Format.dateFormat(reservation.endDate);
  //Email confirmation Stuff.

  async function sendConfirmation() {
    const propAddy = `
    ${property.addressSt}
    ${property.city}, ${property.state} ${property.zip}
    `;
        
    const emailInput = {
        checkInDate: formattedCheckIn,
        checkOutDate: formattedCheckOut,
        customerEmail: customer.email,
        customerName: customer.firstName + " " + customer.lastName,
        propertyAddress: propAddy,
        propertyName: property.name,
        totalPrice: reservation.totalPrice
    };
    await sendEmailConfirmation({
        variables: {
            emailInput: emailInput
        }
    });
    console.log('is this the emailData, ' , emailData);
};

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
      confirmParams: {
        //return_url: "http://localhost:3000/contact",
        payment_method_data: {
            billing_details: {
              name: customer.firstName + " " + customer.lastName,
              email: customer.email,
            }
        },
      }
    });
    console.log('the result: ' , result);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
       console.log('this is the result of the payment? ' , result);
       //save the reservation to the DB HERE. 
       //send email confirmation that the reservation has been saved and card processed.
        await addReservation({
        variables: {
            beginDate: reservation.beginDate,
            endDate: reservation.endDate,
            totalPrice: parseFloat(reservation.totalPrice.replace(/[$,]/g,"")),
            paymentAmountCollected: parseFloat(reservation.totalPrice.replace(/[$,]/g,""))*.50,
            property: reservation.property._id,
            customer: reservation.customer._id
        }
       });
       if(data) {   
         sendConfirmation();
         navigate('/your-reservations');
       } if(loading) {
        return <Loading/>
       } if(error) {
        return error; 
       }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <>
    <div className="res-dp-deets">
       <h2>Your Info</h2>
       <div>
       Name: {customer.firstName} {customer.lastName}
       </div>
       <div>
       Email: {customer.email}
       </div>
    </div>  
    <div className="res-dp-deets">
       <h2>Your Reservation Details</h2>
       <div>
       Property Info:
       <div>{property.name}</div> 
       </div>
       <div>{property.addressSt}.  {property.city}, {property.state} {property.zip}</div>
       <h3>Check In:</h3>
       <div>{reservation.beginDate}</div>
       <h3>Check Out:</h3>
       <div>{reservation.endDate}</div>
    </div>  
    <div className="res-dp-deets">
    <h2>Payment Details</h2>
    <div>
        <h3>Total Cost of Reservation:</h3>
        <div>{reservation.totalPrice}</div>
        <h3>Amount Due to Secure Your Reservation:</h3>
        <div>{downPaymentAmount}</div>
    </div>
    </div>
    <div className="cof-div">
    <form onSubmit={handleSubmit} className='stripe-el'>
      <div className = 'disclaimer'>By completing the payment form you are authorizing the charge for the amount listed below in order to hold the reservation that is detailed above.  You are also acknowledging that this down payment is only refundable up to 30 days before the CHECK IN date listed above; after which any cancellation request must be submitted direclty with the property owner.  Lastly the remaining balance will be due upon Check In.</div>  
      <div className="stripe-content">
      <h3>Down Payment Amount: {downPaymentAmount} USD</h3>  
      <PaymentElement />
      <button disabled={!stripe}>Submit Payment</button>
      </div>
    </form>
    </div>
    </>
  )
};

export default CheckoutFormForDp;