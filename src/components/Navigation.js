import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navigation = (props) => {

  return (
    <>
     <Navbar variant="dark">
      <Nav>
       {props.children}
      </Nav>
     </Navbar>
    </>
  );
};

export default Navigation;
