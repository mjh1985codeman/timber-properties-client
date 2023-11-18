import React from 'react'
//import Nav from 'react-bootstrap/Nav'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavItem(props) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

 // Check if the current location matches the selected navigation item
  // and set the "isActive" state accordingly
  useEffect(() => {
    setIsActive(location.pathname === props.to);
  }, [location.pathname, props.to]);

  return (
    <> 
    <Link to={props.to} className={isActive ? 'nav-it-group active' : 'nav-it-group'}>
        <h1 className='icon'>{props.icon}</h1>
    </Link>
    </>
  )
}
