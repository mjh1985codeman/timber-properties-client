import React from 'react'
import {Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading.js';
import Auth from '../helpers/auth.js';
import Format from '../helpers/formatter.js';
import CoverPic from '../components/CoverPic.js';
const {GET_USER_RESERVATIONS} = require('../controllers/queries.js');

export default function UserReservations() {
const loggedInUser = Auth.getLoggedInUser();
const userEmail = loggedInUser.data.email || "";

function GetUserReservations(email) {
    const resData = useQuery(GET_USER_RESERVATIONS, {
        variables: {
            email: email
        }
    });

    if(resData.data) {
        const resArray = resData.data.getUserReservations.reservations || [];
        if(resArray.length > 0) {
        return<>
        <h1 className='title-text'>{loggedInUser.data.firstName}'s Reservations:</h1>
        <div className='user-res-list'>    
        {resArray.map(res =>
        <div className='user-list-res' key={res.beginDate} > 
        <div className={res.endDate > Date.now() ? ('resCard'    
        ) : (`resCard past-res`)}>
        <div className='user-res-grid-item'> 
        <div className='user-res-grid-content-div'>
        <h4>Check In Date: {new Date(parseInt(res.beginDate)).toLocaleDateString()}</h4>
        <h4>Check Out Date: {new Date(parseInt(res.endDate)).toLocaleDateString()}</h4>
        {res.balance > 0 ? (<h4>Balance Due Upon Check In: {Format.showUSDollar(res.balance)}</h4>) : (<h4>Paid In Full!</h4>)}   
        </div>
        </div>    
        <div className="user-res-grid-item">
        <CoverPic propIdForCover={res.property._id}/>
        <div className='user-res-grid-content-div'>
        <a className='proplink' href={`/properties/${res.property._id}`}>
        <h2>{res.property.name}</h2>
        </a> 
        <h5>{res.property.addressSt}</h5> 
        <h5>{res.property.city}, {res.property.state} {res.property.zip}</h5>
        </div>
        </div>  
        </div>
        </div>
        )}
        </div>  
        </>
        } else if (!resData.loading && !resData.error) {
            return<>
            <div className='propertyCard'>
                <h1 className='title-text'>
                Looks like you don't have any Reservations yet...That's a little sad don't you think? 
                </h1>
                <a className='proplink' href={`/properties`}>
                    <h2>View Properties</h2>
                </a>  
            </div>
            </>
        }
    } else if(resData.loading) {
        return <div><Loading/></div>
    } else if (resData.error) {
        return `There was an error loading the Data: ${resData.error}`
    };
};

    return (
    <Container>
    <div className='propListDiv'>
    {GetUserReservations(userEmail)}
    </div>  
    </Container>   
)
}
