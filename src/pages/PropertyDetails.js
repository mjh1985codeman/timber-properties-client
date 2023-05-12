import React from 'react'
import {useParams, useNavigate } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Loading from '../components/Loading';
import PropPics from '../components/PropPics';
import { useQuery } from '@apollo/client';

//helpers and controllers. 
import Auth from '../helpers/auth';
const {GET_PROPERTY_BY_ID} = require('../controllers/queries');

export default function PropertyDetails() {
    //look at the Path on the App.js file for this component to see why we use propertyId here.  
    let { propertyId } = useParams();
    const navigate = useNavigate();
    function RedirectToAddReservation() {
        const reservePropId = propertyId;
        navigate(`/reserve/${propertyId}`, reservePropId);
    };

    function RedirectToLogin() {
        navigate('/login');
    }
    

    function GetProperty({id}) {
        const {loading, error, data} = useQuery(GET_PROPERTY_BY_ID, {
        variables: {id},
        });
        if(data) {
            const property = data.getProperty;
            const propId = data.getProperty._id;
            return<>
            <div className='propDetailDiv' key={propertyId}>
            <div key={property._id} className='propertyCard'>
            <h2>{property.name}</h2>
            <h5>{property.addressSt}</h5> 
            <h5>{property.city}, {property.state} {property.zip}</h5>
            </div>  
            {Auth.loggedIn() ? (
                <button className="addPropBtn" type='click' onClick={RedirectToAddReservation}>Reserve This Property?</button>
            ) : (
                <div onClick={RedirectToLogin} className="disclaimer">Login or Register to Reserve this property!!!</div>
            )}
            <PropPics propIdForPics={propId}/>
            </div>
            </>
        } else if(loading) {
            return <Loading/>;
        } else if (error) {
            return `Error!!! ${error}`;
        }
    };
    return (
        <>
        <Container>  
        <div className='propListDiv' key={propertyId}>
        {GetProperty({id: propertyId})}
        </div>
        </Container>    
        </>
    )  
}
