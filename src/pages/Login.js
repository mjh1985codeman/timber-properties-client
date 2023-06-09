import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';

//Controllers and Helpers.
import { LOGIN } from '../controllers/mutations';
import Auth from '../helpers/auth';
import validator from '../helpers/validators';

//Components.
import Modal from '../components/Modal';

export default function LoginRegisterModal() {
    
    //state things. 
    const [showIncompleteModal, setShowIncompleteModal] = useState(false);
    const [showInvalidLoginModal, setShowInvalidLoginModal] = useState(false);
    const [formClass, setFormClass] = useState("");
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [loadingLogin, setLoadingLogin] = useState(false);

    const [login] = useMutation(LOGIN, {
      onCompleted: (data) => {
        setLoadingLogin(false);
        // Handle the successful login
        if (data) {
          const token = data.login.token;
          Auth.login(token);
        }
      },
      onError: (error) => {
        setLoadingLogin(false);
        // Handle login errors
        callInvalidLoginModal();
        console.log('error with login:', error);
      },
    });
    
    const navigate = useNavigate();

    function redirectToRegister() {
      navigate('/register');
    }

    function redirectToForgotPassword() {
      console.log('redirect to forgot password has been pushed.')
      navigate('/requestpwreset');
    }

    function resetState() {
      setShowIncompleteModal(false);
      setShowInvalidLoginModal(false);
      setFormClass("");
    };
    
    const callInvalidLoginModal = () => {
        setFormClass('modal-open');
        setShowInvalidLoginModal(true);
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
  const pwNotEmpty = validator.notEmpty(formState.password);

  if (emailNotEmpty || pwNotEmpty) {
    try {
      setLoadingLogin(true);
      await login({
        variables: { email: formState.email, password: formState.password },
      });
    } catch (error) {
      // onError callback will handle the error
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
      {showInvalidLoginModal ? (
      <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Invalid Username or Password.</h1>
      </Modal>
    ) : (null)}  
        <Form className={formClass} onSubmit={handleFormSubmit}>
          <Form.Group className='formcontent'>
            <Form.Label className='formlabel'>
            <h3>Email</h3> 
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
            </Form.Label>
            <Form.Label className='formlabel'>
            <h3>Password</h3>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
            </Form.Label>
          <div className="flex-row flex-end">
          <button type="submit" disabled={loadingLogin}>
          {loadingLogin ? 'Logging in...' : 'LOGIN'}
          </button>
          </div>
        </Form.Group>  
        </Form>
          <div className='disclaimer' onClick={redirectToRegister}>
          Don't have a Login? Click here to Register!
          </div>
          <div className='disclaimer' onClick={redirectToForgotPassword}>
          Reset Password
          </div>
      </Container>
      </>
    );
  }
  