import React from 'react'
import Auth from '../helpers/auth';

export default function Logout() {
    Auth.logout();
    if(!Auth.loggedIn()) {
        return (
        <div>You have been Successfully Logged out!</div>
        )
    } else {
        return(
        <div>There was an issue with logging you out.</div>
        )
    }
}
