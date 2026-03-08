import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from './Modal';
import DatePickerComp from './DatePickerComp';
import { Container } from 'react-bootstrap';
import Format from '../helpers/formatter';
import Auth from '../helpers/auth';
const {GET_PROPERTY_BY_ID} = require('../controllers/queries');

// Converts a UTC Date to a YYYY-MM-DD string using UTC date parts.
function utcDateStr(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export default function ReservePropDataForm({propertyId, currentReservations}) {

    const [resBd, setResBd] = useState("");
    const [resEd, setResEd] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showMaxRangeError, setShowMaxRangeError] = useState(false);
    const [unavailable, setUnavailable] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [theReservedProperty, setTheReservedProperty] = useState({});

    const navigate = useNavigate();

    //Get Logged In user Details: 
    const user = Auth.getLoggedInUser();

    //Get the propertyDetails:
      let resCost = 0; 
      function GetProperty({id}) {
        const {loading, error, data} = useQuery(GET_PROPERTY_BY_ID, {
        variables: {id},
        });

        useEffect(() => {
          if(data) {
            const prop = data.getProperty;
            setTheReservedProperty(prop);
          }
      }, [data]);

        if(data) {
            const property = data.getProperty;
            resCost = property.reserveCost; 
            return<>
            <div className='propDetailDiv' key={propertyId}>
            <h4>Hello {user.data.firstName}!!!</h4>
            <p>Please select a check in, check out date to get started on your epic get away!</p>
            <div key={property._id} className='propertyCard'>
            <p className='disclaimer-text'>You are filling out a request for the below property.</p>
            <h2>{property.name}</h2>
            <h4 className='prop-cost'>{Format.showUSDollar(property.reserveCost)} / day.</h4>
            <h5>{property.addressSt}</h5> 
            <h5>{property.city}, {property.state} {property.zip}</h5>
            </div>
            </div>
            </> 
        } else if(loading) {
            return '...Loading';
        } else if (error) {
            return `Error!!! ${error}`;
        }
    };

    let numberOfNights = 0;
    
    useEffect(() => {
        const unavailableDateStrings = [];
        currentReservations.forEach(range => {
          const current = new Date(range.beginDate);
          const end = range.endDate;
          while (current <= end) {
            unavailableDateStrings.push(utcDateStr(current));
            current.setUTCDate(current.getUTCDate() + 1);
          }
        });
        setUnavailable(unavailableDateStrings);
    },[currentReservations]); 
    
  const disabledDates = unavailable || [];
  
  function handleCloseModal() {
    setShowErrorModal(false);
    setShowSuccessModal(false);
    setShowMaxRangeError(false);
    window.location.reload();
  };

    const handleCheckInDateSelect = (date) => {
      setCheckInDate(date);
      setResBd(Format.toDateString(date));
    };

    const handleCheckOutDateSelect = (date) => {
      setCheckOutDate(date);
      setResEd(Format.toDateString(date));
    };

    function getResNumberOfNights(resDates) {
      const numberOfNights = resDates.length;
      return numberOfNights;
    }

    function getRequestedDateRange() {
      const allRequestedDates = [];
      if (!checkInDate || !checkOutDate) return allRequestedDates;
      const current = new Date(checkInDate);
      current.setHours(0, 0, 0, 0);
      const end = new Date(checkOutDate);
      end.setHours(0, 0, 0, 0);

      while (current <= end) {
        allRequestedDates.push(Format.toDateString(new Date(current)));
        current.setDate(current.getDate() + 1);
      }
      return allRequestedDates;
    };

    function verifyRange() {  
        const requestedDates = getRequestedDateRange();
        let goodRange = true;
        if(requestedDates.length > 60) {
          setShowMaxRangeError(true);
          goodRange = 'Maximum Dates Exceeded';
        }
        if(requestedDates.length <= 0) {
          goodRange = false;
        }
        const unavailableSet = new Set(disabledDates);
        for (let i = 0; i < requestedDates.length; i++) {
          if (unavailableSet.has(requestedDates[i])) {
            goodRange = false;
          }
          numberOfNights = getResNumberOfNights(requestedDates);
        }
        return goodRange;
      };

      function verifyFields() {
        if(resBd !== "" && resEd !== "" && resBd !== null && resEd !== null) {
          return true;
        } else {
          return false;
        }
      };
      

    function handleSubmit(e) {
      e.preventDefault(); 
      const completedForm = verifyFields();
      const validRangeRequested = verifyRange(); 

      if(completedForm && validRangeRequested !== 'Maximum Dates Exceeded' && validRangeRequested) {
            const resLength = numberOfNights;
            const totalCost = Format.showUSDollar(resLength * resCost);
            //Will figure out the reservation cost here. 
            const resObj = {
              beginDate: resBd,
              endDate: resEd,
              downPaymentPaid: false,
              totalPrice: totalCost,
              balance: totalCost,
              paidInFull: false,
              property: theReservedProperty,
              customer: user.data,
              numberOfDays: resLength 
          }; 
          //add validation to the resObj object?  
          navigate(`/reserve/${propertyId}/confirm`, {state: {res: resObj}});   
          //setShowSuccessModal(true);
        } else if (!completedForm || !validRangeRequested) {
            setShowErrorModal(true);
            //resetState();
          } else if (validRangeRequested === 'Maximum Dates Exceeded') {
            setShowMaxRangeError(true);
          }
      };

      return (
        <>
        <Container className='form-container'>
        {showErrorModal ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Reservation Request Failed.</h1>
            <h4>Looks like you may have requested some dates that are not available.  Please Check all fields and try again.</h4>
        </Modal>
        ) : (null)}
        {showMaxRangeError ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Whoa Leave some days for the rest of us.</h1>
            <h4>Max Number of Days you can reserve a property for is 60 days.</h4>
        </Modal>
        ) : (null)}
        {showSuccessModal ? (
        <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Your Reservation Request Has Been Submitted!!</h1>
            <h4>Please check your email for additional details.</h4>
        </Modal>
        ) : (null)}
        {GetProperty({id: propertyId})}
        <Form className='formstyle' onSubmit={handleSubmit}>
        <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
              <h2>Check In</h2>
              <DatePickerComp name="bd" onDateSelect={handleCheckInDateSelect} unavailableDates={disabledDates}/>
            </Form.Label>
            <Form.Label className='formlabel'>
              <h2>Check Out</h2>
              <DatePickerComp name="ed" onDateSelect={handleCheckOutDateSelect} unavailableDates={disabledDates}/>
            </Form.Label>
          <Button type="submit">Next</Button>
        </Form.Group>
        </Form> 
        </Container>
        </>
      );
    }