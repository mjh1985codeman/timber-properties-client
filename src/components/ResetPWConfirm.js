import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
// import { useMutation } from '@apollo/client';
import Auth from '../helpers/auth';
import { useParams } from 'react-router-dom';

//Controllers and Helpers.
import validator from '../helpers/validators';

//Components.
//import Loading from '../components/Loading';
import Modal from '../components/Modal';

export default function ResetPWRequestComp() {
//state things. 
const [showIncompleteModal, setShowIncompleteModal] = useState(false);
const [showPWResetSuccessModal, setShowPWResetSuccessModal] = useState(false);
const [showInvalidTokenModal, setShowInvalidTokenModal] = useState(false);
const [formClass, setFormClass] = useState("");
const [formState, setFormState] = useState({ newPW: '', confirmNewPW: ''});


//verify the token in the url. 
const {token} = useParams();
console.log('is this the token in the url? ' , token);

function resetState() {
    setShowPWResetSuccessModal(false);
    setShowInvalidTokenModal(false);
    setShowIncompleteModal(false);
    setFormClass("");
};

const callShowPWResetSuccessModal = () => {
    setFormClass('modal-open');
    setShowPWResetSuccessModal(true);
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
  const notEmpty = validator.notEmpty(formState);
  //Verify the token is valid. 
  const validToken = Auth.verifyToken(token);
  if(!validToken && notEmpty) {
    setShowInvalidTokenModal(true);
  }

  if(!notEmpty) {
    callIncompleteModal();
  }

  if(notEmpty && validToken) {
    //Here we need to add a mutation to send the reqeust to the server to update the pw.
    callShowPWResetSuccessModal();
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
  {showInvalidTokenModal ? (
  <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
        <h1>Invalid Token!</h1>
        <h4>Password Reset Failed.</h4>
  </Modal>
  ) : (null)}
  {showPWResetSuccessModal ? (
  <Modal handleClose={handleCloseModal} className='modalstyle'>
        <h1>Your Password has been reset.</h1>
  </Modal>
) : (null)}  
    <Form className={formClass} onSubmit={handleFormSubmit}>
      <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
        <h3>New Password.</h3> 
        <input
          name="newPW"
          type="password"
          id="newPW"
          onChange={handleChange}
        />
        </Form.Label>
        <Form.Label className='formlabel'>
        <h3>Confirm Password.</h3> 
        <input
          name="confirmNewPW"
          type="password"
          id="confirmNewPW"
          onChange={handleChange}
        />
        </Form.Label>
      <div className="flex-row flex-end">
        <button type="submit">Update Password</button>
      </div>
    </Form.Group>  
    </Form>
  </Container>
  </>
);
}
