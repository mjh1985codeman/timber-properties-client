//This component serves as the list of properties and the ability to upload new properties.
import React from 'react';
import {Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useNavigate} from "react-router-dom";
import Loading from '../components/Loading.js';
import Auth from '../helpers/auth.js';
const {GET_PROPERTIES} = require('../controllers/queries.js');


export default function Properties(props) {
  const navigate = useNavigate();

  function GetProperties() {
    const propData = useQuery(GET_PROPERTIES);
    if(propData.data) {
      const propArray = propData.data.getProperties;
        return<>
        <div className='btn-div'>
        {Auth.isAdmin() ? (
        <button type='click' onClick={RedirectToAddProperty} className='addPropBtn'>Add a Property</button>
        ) : (null)}  
        </div>
        <div className='propertylist'>
        {propArray.map(property => (
        <div key={property._id} className='propertyCard'>
        <a className='proplink' href={`/properties/${property._id}`}>
        <h2>{property.name}</h2>
        </a>  
        <h5>{property.addressSt}</h5> 
        <h5>{property.city}, {property.state} {property.zip}</h5>
        </div>  
        ))}
        </div>  
        </>
    } else if(propData.loading) {
      return <div><Loading/></div>
    } else if (propData.error) {
      return `There was an error loading the Data: ${propData.error}`
    };
  };
  
  function RedirectToAddProperty() {
    navigate("/properties/addproperty");
  }

  return (
    <>
    <Container>
    <div className='propListDiv'>
    {GetProperties()}
    </div>  
    </Container>    
    </>
  )
}
