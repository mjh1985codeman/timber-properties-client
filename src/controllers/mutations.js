import {gql} from '@apollo/client';

export const ADD_PROPERTY = gql`
mutation Mutation($name: String, $reserved: Boolean, $reserveCost: Float, $addressSt: String, $city: String, $state: String, $zip: Int, $readyToReserve: Boolean, $available: Boolean) {
  addProperty(name: $name, reserved: $reserved, reserveCost: $reserveCost, addressSt: $addressSt, city: $city, state: $state, zip: $zip, readyToReserve: $readyToReserve, available: $available) {
    _id
    addressSt
    available
    city
    name
    readyToReserve
    reserveCost
    reserved
    state
    zip
  }
}
`

export const ADD_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!, $phone: String, $role: String) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, phone: $phone, role: $role) {
    token
    user {
      _id
      email
      role
      reservations {
        _id
        }
    }
  }
}
`

export const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      firstName
      lastName
      phone
      reservations {
        _id
      }
      role
    }
  }
}
`

// example Payload for ADD_Reservation: 
// {
//   "beginDate": "2023-05-20",
//   "endDate": "2023-05-25",
//   "downPaymentPaid": true,
//   "totalPrice": 50000.00,
//   "balance": 45000.00,
//   "paidInFull": false,
//   "property": "645e99f2b06a06ee99253305",
//   "customer": "645e9ffb15a54cd3084e822d"
// }

export const ADD_RESERVATION = gql`
mutation Mutation($beginDate: String, $endDate: String, $downPaymentPaid: Boolean, $totalPrice: Float, $balance: Float, $paidInFull: Boolean, $property: ID, $customer: ID) {
  addReservation(beginDate: $beginDate, endDate: $endDate, downPaymentPaid: $downPaymentPaid, totalPrice: $totalPrice, balance: $balance, paidInFull: $paidInFull, property: $property, customer: $customer) {
    _id
    balance
    beginDate
    customer {
      _id
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

//example Response for ADD_RESERVATION: 
// {
//   "data": {
//     "addReservation": {
//       "_id": "645ea0fb15a54cd3084e8230",
//       "balance": 45000,
//       "beginDate": "1684559105005",
//       "customer": {
//         "_id": "645e9ffb15a54cd3084e822d"
//       },
//       "downPaymentPaid": true,
//       "endDate": "1684991105005",
//       "paidInFull": false,
//       "property": {
//         "_id": "645e99f2b06a06ee99253305"
//       },
//       "totalPrice": 50000
//     }
//   }
// }

export const SEND_EMAIL_CONFIRMATION = gql`
mutation Mutation($emailInput: ReservationEmailInput) {
  sendReservationEmailConfirmation(emailInput: $emailInput)
}
`

// {
//   "emailInput": {
//     "checkInDate": null,
//     "checkOutDate": null,
//     "customerEmail": null,
//     "customerName": null,
//     "propertyAddress": null,
//     "propertyName": null,
//     "totalPrice": null
//   }
// }

