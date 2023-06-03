import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../helpers/auth';
import { useParams, useNavigate } from 'react-router-dom';

//Controllers and Helpers.
import validator from '../helpers/validators';

//Components.
//import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { CHANGE_PW } from '../controllers/mutations';

export default function ResetPWRequestComp() {
//state things. 
const [showIncompleteModal, setShowIncompleteModal] = useState(false);
const [showPWResetSuccessModal, setShowPWResetSuccessModal] = useState(false);
const [showInvalidTokenModal, setShowInvalidTokenModal] = useState(false);
const [showNoMatchModal, setShowNoMatchModal] = useState(false);
const [formClass, setFormClass] = useState("");
const [formState, setFormState] = useState({ newPW: '', confirmNewPW: ''});

const navigate = useNavigate();
//verify the token in the url. 
const {token} = useParams();

const [updatePassword] = useMutation(CHANGE_PW, {
  onCompleted: (data) => {
    if (data) {
      handleSuccessfulReset();
    }
  },
  onError: (error) => {
    // Handle errors
    console.log('error:', error);
  },
});

function handleSuccessfulReset() {
  callShowPWResetSuccessModal();
  setTimeout(function () {
    navigate('/login');
  }, 2000)
}

function resetState() {
    setShowInvalidTokenModal(false);
    setShowIncompleteModal(false);
    setShowNoMatchModal(false);
    setShowPWResetSuccessModal(false);
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

const callNoMatchModal = () => {
  setFormClass('modal-open');
  setShowNoMatchModal(true);
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
    const match = formState.newPW === formState.confirmNewPW;
    const tokenEmail = Auth.getEmailFromToken(token);
    if(match) {
      updatePassword({variables: {
        email: tokenEmail,
        token: token,
        password: formState.confirmNewPW
      }})
    } else {
      //throw match error.  
      console.log('no match. . .')
      callNoMatchModal();
    }
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
  {showNoMatchModal ? (
  <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
        <h1>Passwords Do Not Match!</h1>
        <h4>Looks like you were unable to confirm the new password.  Please Try Again.</h4>
  </Modal>
  ) : (null)}
  {showPWResetSuccessModal ? (
  <Modal handleClose={handleCloseModal} className='modalstyle'>
        <h1>Success!!!  Please Wait to Be Redirected To Login.</h1>
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
