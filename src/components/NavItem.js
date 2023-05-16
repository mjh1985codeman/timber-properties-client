import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useState, useEffect } from 'react';

export default function NavItem(props) {
  const [isActive, setIsActive] = useState(false);

// Check if the current component matches the selected navigation item
// and set the "isActive" state accordingly
useEffect(() => {
  const currentPath = window.location.pathname;
  setIsActive(currentPath === props.to);
}, [props.to]);

  return (
    <> 
    
        <Nav.Link href={props.to}>
        <div className={isActive ? 'nav-it-group active' : 'nav-it-group'}>
        <h1 className='icon'>{props.icon}</h1>
        </div>
        </Nav.Link>
    
    </>
  )
}
