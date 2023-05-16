import React from 'react'
import Nav from 'react-bootstrap/Nav'

export default function NavItem(props) {

  return (
    <>  
    <li>
      
        <Nav.Link href={props.to}>
        <div className='nav-it-group'>
        <h1 className='icon'>{props.icon}</h1>
        <h5 className='nav-text'>{props.text}</h5>
        </div>
        </Nav.Link>
    </li>
    </>
  )
}
