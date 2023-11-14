import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { Container } from 'react-bootstrap';

//Components.
import Modal from '../components/Modal';

//Controllers and Helpers. 
import { ADD_USER } from '../controllers/mutations';
import Auth from '../helpers/auth';
import validator from '../helpers/validators';


export default function Register() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("customer");
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showPWModal, setShowPWModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [formClass, setFormClass] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    //const [addUser, {loading, error, data}] = useMutation(ADD_USER);

    const alreadyLoggedIn = Auth.loggedIn();

    const [addUser] = useMutation(ADD_USER, {
      onCompleted: (data) => {
        setLoadingLogin(false);
        if(data) {
        const token = data.addUser.token;
        Auth.login(token);
        navigate('/');
        }
      },
      onError: (error) => {
        setLoadingLogin(false);
        handleError(error);
      }
    })

    function resetState() {
      setUserRole("customer");
      setUserFirstName("");
      setUserLastName("");
      setUserPhone("");
      setUserEmail("");
      setUserPassword("");
      setShowModal(false);
      setShowPWModal(false);
      setFormClass("");
      setShowDuplicateModal(false);
    };
    
    const handleOpenModal = () => {
        setFormClass('modal-open');
        setShowModal(true);
    };

    const callPWModel = () => {
        setFormClass('modal-open');
        setShowPWModal(true);
    };

    const callDuplicateModel = () => {
        setFormClass('modal-open');
        setShowDuplicateModal(true);
    };
    
    const handleCloseModal = () => {
        resetState();
    };

    const callOpenModal = () => {
        handleOpenModal();
    };

    function handleInputChange(e) {
        e.preventDefault();
        
        const {name, value} = e.target;

        if(name === 'userRole') {
            return setUserRole(value);
        } else if (name === 'userFirstName') {
            return setUserFirstName(value);
        } else if (name === 'userLastName') {
            return setUserLastName(value);
        } else if (name === 'userPhone') {
            return setUserPhone(value)
        }
        else if (name === 'userEmail') {
            return setUserEmail(value)
        }
        else if (name === 'userPassword') {
            return setUserPassword(value)
        };
    }

    function handleError(err) {
      const errStr = JSON.stringify(err);
      const error = JSON.parse(errStr);
      if(error.message) {
        const message = error.message;
        const duplicate = message.includes('duplicate');
        if(duplicate){
          callDuplicateModel();
        }
      }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const userObj = {
          firstName: userFirstName,
          lastName: userLastName,
          phone: userPhone,
          email: userEmail,
          role: userRole,
          password: userPassword, 
        };
        const notEmpty = validator.notEmpty(userObj);
        const enoughCharacters = validator.pwValidator(userObj.password); 
        if(notEmpty && enoughCharacters) {
            try {
              setLoadingLogin(true);
              await addUser({
                variables: {
                      firstName: userObj.firstName,
                      lastName: userObj.lastName,
                      phone: userObj.phone,
                      email: userObj.email,
                      role: userObj.role,
                      password: userObj.password
                    }
              });
            } catch (error) {
              //callback will handle the error. 
            }
        } if (!notEmpty) {
            callOpenModal();
        } if (!enoughCharacters) {
          callPWModel();
        }
      };

  if(!alreadyLoggedIn) {
  return (
    <>
    <Container className='form-container'>
    {showModal ? (
    <Modal handleClose={handleCloseModal} className='modalstyle overlay'>
            <h1>All Fields are Required!</h1>
            <h4>Please Verify all fields and try again.</h4>
    </Modal>
    ) : (null)}
    {showPWModal ? (
    <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Password Must Be at Least 8 characters!</h1>
            <h4>Please Verify all fields and try again.</h4>
    </Modal>
    ) : (null)}
    {showDuplicateModal ? (
    <Modal handleClose={handleCloseModal} className='modalstyle'>
            <h1>Server Rejected Request!</h1>
            <h4>A User with that Email Already Exists.</h4>
    </Modal>
    ) : (null)}
    <Form className={formClass} id='form' onSubmit={handleSubmit}>
      <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
          <h3>First Name</h3>
          <input className='calinput'type="text" name="userFirstName" value={userFirstName} onChange={handleInputChange}/>
        </Form.Label>
        <Form.Label className='formlabel'>
          <h3>Last Name</h3>
          <input className='calinput' type="text" name="userLastName" value={userLastName} onChange={handleInputChange}/>
        </Form.Label>
        <Form.Label className='formlabel'>
          <h3>Phone Number</h3>
          <input className='calinput' type="text" name="userPhone" value={userPhone} onChange={handleInputChange}/>
        </Form.Label>
        <Form.Label className='formlabel'>
          <h3>Email</h3>
          <input className='calinput' type="email" name="userEmail" value={userEmail} onChange={handleInputChange}/>
        </Form.Label>
        <Form.Label className='formlabel'>
        <h3>Password</h3>
        <input className='calinput' type="password" name="userPassword" value={userPassword} onChange={handleInputChange}/>
        </Form.Label>
    <button type='submit'> {loadingLogin ? 'Logging in...' : 'REGISTER'}</button>
    </Form.Group>
    </Form> 
    </Container>
  </>
  ) 
  } else {
    return (
    <h1>Looks Like you have already registered and logged in!</h1>
    )
  }
}