import {gql} from '@apollo/client';

//PAY ATTENTION TO THE SPACES!
export const GET_RESERVATIONS = gql`
query Query {
  getReservations {
    _id
    beginDate
    endDate
    downPaymentPaid
    totalPrice
    balance
    paidInFull
    property {
      _id
      name
      reserved
      reserveCost
      addressSt
      city
      state
      zip
      readyToReserve
      available
    }
    customer {
      _id
      firstName
      lastName
      phone
      email
    }
  }
}
`;

export const GET_PROPERTIES = gql`
  {
    getProperties {
      _id
      name
      reserveCost
      reserved
      addressSt
      city
      state
      zip
      readyToReserve
      available
    }
  }
`;

export const GET_CUSTOMER_BY_ID = gql`
  query Query($id: ID!) {
    getCustomer(_id: $id) {
      _id
      firstName
      lastName
      phone
      email
      reservations {
        _id
        beginDate
        endDate
        downPaymentPaid
        totalPrice
        balance
        paidInFull
        property {
          _id
          name
          reserved
          reserveCost
          addressSt
          city
          state
          zip
          readyToReserve
          available
        }
      }
    }
  }
`;

export const GET_PROPERTY_BY_ID = gql`
query Query($id: ID!) {
  getProperty(_id: $id) {
    _id
    name
    reserved
    reserveCost
    addressSt
    city
    state
    zip
    readyToReserve
    available
  }
}
`

export const GET_PROP_BY_NAME = gql`
query Query($name: String!) {
  getPropertyByName(name: $name) {
    _id
    name
    reserved
    reserveCost
    addressSt
    city
    state
    zip
    readyToReserve
    available
  }
}
`

export const GET_S3_BUCKET_URL = gql`
query Query($propId: ID!) {
  getS3URL(propId: $propId)
}
`

export const GET_RESERVATIONS_BY_PROP_ID = gql`
query Query($id: ID!) {
  getReservationsByPropertyId(_id: $id) {
    _id
    balance
    beginDate
    customer {
      _id
      email
      phone
      firstName
      lastName
    }
    downPaymentPaid
    endDate
    paidInFull
    property {
      _id
    }
    totalPrice
  }
}
`
