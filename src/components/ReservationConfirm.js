import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import {useMutation} from "@apollo/client";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from './Modal';
import Format from '../helpers/formatter';
import { Container } from 'react-bootstrap';
import { SEND_EMAIL_CONFIRMATION } from '../controllers/mutations';

export default function ReservationConfirm() {
    const location = useLocation();
    const resDetails = location.state.res;
    
    const [resCustomerEmail, setResCustomerEmail] = useState(resDetails.customer.email || "");
    const [resCustomerPhone, setResCustomerPhone] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();

    // const [addReservation, {loading, error, data}] = useMutation(ADD_RESERVATION);

    const [sendEmailConfirmation, {data}] = useMutation(SEND_EMAIL_CONFIRMATION);

    function handleCloseModal() {
        setShowErrorModal(false);
        setShowSuccessModal(false);
        //Will navigate to the property 'thank you' componenet later.  
        navigate('/thankyou', {state: {resDPCheckout: resDetails}});
    };

    function handleChange(e) {
        const {name, value} = e.target;
        if(name === "res-customer-email") {
            setResCustomerEmail(value);
        };
        if(name === "res-customer-phone") {
            setResCustomerPhone(value);
        };
    };

    const formattedCheckIn = Format.dateFormat(resDetails.beginDate);
    const formattedCheckOut = Format.dateFormat(resDetails.endDate);

    function formatPhoneNumber(phoneNumber) {
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, ""); // Remove non-digit characters
        const formattedPhoneNumber = cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        return formattedPhoneNumber;
    }

    async function sendConfirmation() {
        const propAddy = `
        ${resDetails.property.addressSt}
        ${resDetails.property.city}, ${resDetails.property.state} ${resDetails.property.zip}
        `;
            
        const emailInput = {
            checkInDate: formattedCheckIn,
            checkOutDate: formattedCheckOut,
            customerEmail: resDetails.customer.email,
            customerName: resDetails.customer.firstName + " " + resDetails.customer.lastName,
            propertyAddress: propAddy,
            propertyName: resDetails.property.name,
            totalPrice: resDetails.totalPrice
        };
        console.log('emailInput' , emailInput);
        await sendEmailConfirmation({
            variables: {
                emailInput: emailInput
            }
        })
        console.log('is this the data, ' , data);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const reservation = {
            beginDate: resDetails.beginDate,
            endDate: resDetails.endDate,
            downPamentPaid: false,
            totalPrice: resDetails.totalPrice,
            // balance: resDetails.totalPrice,
            // paidInFull: false,
            property: resDetails.property._id,
            customer: resDetails.customer._id,
        };

        console.log('reservation to be sent to ADD_RESERVATION mutation: ' , reservation);

        sendConfirmation();
        setShowSuccessModal(true);
    }

return (
    <>
    <>
        <Container className='form-container'>
        {showErrorModal ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Reservation Request Failed.</h1>
            <h4>Looks like you may have requested some dates that are not available.  Please Check all fields and try again.</h4>
        </Modal>
        ) : (null)}
        {showSuccessModal ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Your Reservation Request Has Been Submitted!!</h1>
            <h4>Please check your email for additional details.</h4>
        </Modal>
        ) : (null)}
        <div className="propDetailDiv">
        <div className='big-disclaimer'>Your current estimate based on the {resDetails.numberOfDays} days that make up your reservation is {resDetails.totalPrice}.</div>  
        <h3 className='big-disclaimer'>CheckIn Date: {formattedCheckIn}</h3>
        <h3 className='big-disclaimer'>CheckOut Date: {formattedCheckOut}</h3>
        </div>
        <div className='disclaimer'>Upon Submission of your request the Property Manager will follow up to provide additional details.</div>
        <Form className='formstyle' onSubmit={handleSubmit}>
        <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
            <h2>Your Email</h2>
            <input type='email' name="res-customer-email" onChange={handleChange} value={resCustomerEmail}/>
        </Form.Label>
        <Form.Label className='formlabel'>
            <h2>Your Phone Number</h2>
            <input type='tel'
                placeholder='xxx-xxx-xxxx'
                name="res-customer-phone"
                onChange={handleChange}
                value={formatPhoneNumber(resCustomerPhone)}
                maxLength={12}/>
        </Form.Label>
        <Button type="submit">Submit Reservation Request</Button>
        </Form.Group>
        </Form> 
        </Container>
        </>
    </>
)
}
