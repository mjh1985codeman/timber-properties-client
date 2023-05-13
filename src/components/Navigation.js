import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navigation = (props) => {

  return (
    <>
     <Navbar className="navigation" collapseOnSelect expand="lg" variant="dark">
     <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-flow-toggle"/>
     <Navbar.Collapse id="responsive-navbar-nav" className="nav-flow">
      <Nav>
       {props.children}
      </Nav>
      </Navbar.Collapse>
     </Navbar>
    </>
  );
};

export default Navigation;
