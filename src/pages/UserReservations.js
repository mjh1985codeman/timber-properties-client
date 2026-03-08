import React, { useState } from 'react'
import {Container} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import Loading from '../components/Loading.js';
import Auth from '../helpers/auth.js';
import Format from '../helpers/formatter.js';
import CoverPic from '../components/CoverPic.js';
const {GET_USER_RESERVATIONS} = require('../controllers/queries.js');

const PAGE_SIZE = 5;

export default function UserReservations() {
  const loggedInUser = Auth.getLoggedInUser();
  const userEmail = loggedInUser.data.email || "";
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useQuery(GET_USER_RESERVATIONS, {
    variables: { email: userEmail }
  });

  if (loading) {
    return <Container><div className='propListDiv'><Loading/></div></Container>;
  }

  if (error) {
    return (
      <Container>
        <div className='propListDiv'>
          <h2 className='title-text'>There was an error loading your reservations.</h2>
        </div>
      </Container>
    );
  }

  const resArray = data?.getUserReservations?.reservations || [];

  if (resArray.length === 0) {
    return (
      <Container>
        <div className='propListDiv'>
          <div className='propertyCard'>
            <h1 className='title-text'>
              Looks like you don't have any Reservations yet...That's a little sad don't you think?
            </h1>
            <a className='proplink' href='/properties'>
              <h2>View Properties</h2>
            </a>
          </div>
        </div>
      </Container>
    );
  }

  const totalPages = Math.ceil(resArray.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageReservations = resArray.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <Container>
      <div className='propListDiv'>
        <h1 className='title-text'>{loggedInUser.data.firstName}'s Reservations:</h1>
        <div className='user-res-list'>
          {pageReservations.map(res => (
            <div className='user-list-res' key={res._id}>
              <div className={parseInt(res.endDate) > Date.now() ? 'resCard' : 'resCard past-res'}>
                <div className='user-res-grid-item'>
                  <div className='user-res-grid-content-div'>
                    <h4>Check In Date: {Format.displayDate(res.beginDate)}</h4>
                    <h4>Check Out Date: {Format.displayDate(res.endDate)}</h4>
                    {res.balance > 0
                      ? <h4>Balance Due Upon Check In: {Format.showUSDollar(res.balance)}</h4>
                      : <h4>Paid In Full!</h4>
                    }
                  </div>
                </div>
                <div className='user-res-grid-item'>
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
          ))}

          {totalPages > 1 && (
            <div className='pagination-controls'>
              <button
                className='pagination-btn'
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
              >
                &larr; Previous
              </button>
              <span className='pagination-info'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='pagination-btn'
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
