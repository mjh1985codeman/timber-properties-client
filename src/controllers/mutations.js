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