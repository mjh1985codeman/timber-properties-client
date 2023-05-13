import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

//Controllers and Helpers.
import validator from '../helpers/validators';

import Modal from '../components/Modal';

export default function ContactForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formClass, setFormClass] = useState("");
  const [contactFormState, setContactFormState] = useState({cName:'', email:'', message:''});

  const initialFormState = {
    cName: '',
    email: '',
    message: ''
  };

  //Modal State Things// 
  function resetState() {
    console.log('reset state being called');
    setContactFormState(initialFormState);
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setFormClass("");
  };
  
  const callShowErrorModal = () => {
      setFormClass('modal-open');
      setShowErrorModal(true);
  };

  const callShowSuccessModal = () => {
    setFormClass('modal-open');
    setShowSuccessModal(true);
  };
  
  const handleCloseModal = () => {
      resetState();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactFormState({
      ...contactFormState,
      [name]: value,
    });
  };

  const formId = "y9tP50sV";
  const formSparkUrl = `https://submit-form.com/${formId}`;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formComplete = validator.notEmpty(contactFormState);
    if(formComplete) {
      try{
        fetch(formSparkUrl, {
            method: 'POST',
            body: JSON.stringify({
              id: contactFormState.message,
              cName: contactFormState.cName,
              message: contactFormState.message,
            }),
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }, 
          }).then(data => {
            console.log('data: ' , data);
            if(data) {
            callShowSuccessModal();
            };
          });
          } catch (err) {
            return `There was an error submitting your request: ${err}`
          }
    } else {
      callShowErrorModal();
    }
  }


  // JSX
  return (
    <Container className='form-container'>
      {showErrorModal ? (
      <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
            <h1>All Fields are Required!</h1>
            <h4>Please Verify all fields and try again.</h4>
      </Modal>
      ) : (null)}      
      {showSuccessModal ? (
      <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
            <h1>Your message has been sent!</h1>
            <h4>Thank you for your submission!  We will be in contact shortly.</h4>
      </Modal>
      ) : (null)}      
      <h1>Contact me</h1>
      <Form className={formClass} onSubmit={handleFormSubmit}>
      <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
          <h3>Name</h3>
          <input
            placeholder='James Smith'
            name="cName"
            type="text"
            id="cName"
            onChange={handleChange}
          />
        </Form.Label>
        <Form.Label className='formlabel'>
          <h3>Email</h3>
          <input
            placeholder='youremailaddress@goeshere.com'
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </Form.Label>
        <Form.Label className='formlabel'>
          <h3>Message</h3>
          <textarea
            placeholder='Say what you need to say!'
            name="message"
            id="message"
            onChange={handleChange}
            rows="5"
          />
        </Form.Label>
        <div className="flex-row flex-end">
            <button type="submit">Submit</button>
        </div>
      </Form.Group>
      </Form>
    </Container>
  );
}

