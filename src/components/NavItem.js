import React from 'react'
import Nav from 'react-bootstrap/Nav'

export default function NavItem(props) {

  return (
    <>  
    <li>
        <Nav.Link href={props.to}><h4 className='nav-item'>{props.text}</h4></Nav.Link>
    </li>
    </>
  )
}
