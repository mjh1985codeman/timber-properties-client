import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

//Controllers and Helpers.
import { GET_PW_RESET_LINK } from '../controllers/mutations';
import validator from '../helpers/validators';

//Components.
//import Loading from '../components/Loading';
import Modal from '../components/Modal';

export default function ResetPWRequestComp() {
//state things. 
const [showIncompleteModal, setShowIncompleteModal] = useState(false);
const [showResetRequestSubmitted, setShowResetRequestSubmitted] = useState(false);
const [formClass, setFormClass] = useState("");
const [formState, setFormState] = useState({ email: ''});
// const [requestResetPWEmail, { error }] = useMutation(REQUEST_RESET_PW_EMAIL);
const [getPWResetLink, { data }] = useMutation(GET_PW_RESET_LINK);

function resetState() {
  setShowIncompleteModal(false);
  setShowResetRequestSubmitted(false);
  setFormClass("");
};

const callResetEmailSentModal = () => {
    setFormClass('modal-open');
    setShowResetRequestSubmitted(true);
};

const callIncompleteModal = () => {
    setFormClass('modal-open');
    setShowIncompleteModal(true);
};

const handleCloseModal = () => {
    resetState();
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const emailNotEmpty = validator.notEmpty(formState.email);
  if(emailNotEmpty) {
    try {
      const getPWResetLinkResponse = await getPWResetLink({
        variables: { email: formState.email},
      });
      if(getPWResetLinkResponse) {
        callResetEmailSentModal();
        return data;
      }
    } catch(err) {
      console.log('error with login: ' , err);
    }
  } else {
    callIncompleteModal();
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormState({
    ...formState,
    [name]: value,
  });
};

return (
  <>
  <Container className='form-container'>
  {showIncompleteModal ? (
  <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
        <h1>All Fields are Required!</h1>
        <h4>Please Verify all fields and try again.</h4>
  </Modal>
  ) : (null)}
  {showResetRequestSubmitted ? (
  <Modal handleClose={handleCloseModal} className='modalstyle'>
        <h1>If a User with this email exists you will recieve a link used to reset your password.</h1>
  </Modal>
) : (null)}  
    <Form className={formClass} onSubmit={handleFormSubmit}>
      <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
        <h3>Please Enter the Email Associated With Your Account.</h3> 
        <input
          placeholder="youremail@test.com"
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
        />
        </Form.Label>
      <div className="flex-row flex-end">
        <button type="submit">Reset Password</button>
      </div>
    </Form.Group>  
    </Form>
  </Container>
  </>
);
}
