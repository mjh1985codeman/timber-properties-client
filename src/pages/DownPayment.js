import React from 'react'
import { Container } from 'react-bootstrap';
import CheckoutDownPayment from '../components/CheckoutDownPayment';

export default function ThankYou() {
  return (
    <Container className='form-container'>
    <div className='propDetailDiv'>
        <h1>You're almost there! (PLEASE READ BELOW!!!)</h1>
        <div className='big-disclaimer'>All reservations require an immediate 50% down payment in order for your reservation to be officially booked.  Please review and verify the details for your reservation below; then complete the payment form in order to secure your booking!</div>
        <h2>Ps. . .This is a demo soooo...Nothing is really happening here but these features are wicked awesome huh?!</h2>
    </div>
    <CheckoutDownPayment/>
    </Container>
  )
}
