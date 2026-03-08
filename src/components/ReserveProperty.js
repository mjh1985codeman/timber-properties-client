// Parent component
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ReservePropDataForm from './ReservePropDataForm';
const { GET_RESERVATIONS_BY_PROP_ID } = require('../controllers/queries');

export default function ReserveProperty() {
  const { propertyId } = useParams();

  const { data, loading, error } = useQuery(GET_RESERVATIONS_BY_PROP_ID, {
    variables: { id: propertyId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  // Dates come as epoch-ms strings from GraphQL. Parse them back to Date objects.
  // These are stored at noon UTC, so UTC methods should be used when iterating over date ranges.
  const currentReservations = data.getReservationsByPropertyId.map((res) => ({
    beginDate: new Date(parseInt(res.beginDate)),
    endDate: new Date(parseInt(res.endDate)),
  }));

  return (
    <ReservePropDataForm
      propertyId={propertyId}
      currentReservations={currentReservations}
    />
  );
}

