import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import hogpic from '../assets/hogpkgpic.jpg';
import rampic from '../assets/rampilpic.png';

export default function Packages() {
  return (
    <Container>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav className="flex-column">
          <Nav.Item className="pkg-tab">
            <Nav.Link eventKey="first"><h5 className="pkg-tab-pill">Hog Package</h5></Nav.Link>
          </Nav.Item>
          <Nav.Item className="pkg-tab">
          <Nav.Link eventKey="second"><h5 className="pkg-tab-pill">Rams Package</h5></Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="first">
    <Card>
      <Card.Header as="h5">STANDARD HOG PACKAGE</Card.Header>
      <Card.Body>
        <Card.Title>$750.00</Card.Title>
        <Card.Text>
         <ul>
            <li>3 DAYS 2 NIGHTS, 2 HOGS OF ANY SIZE.</li>
            <li>INCLUDES A MINIMUM OF 4 BLIND SITS AND MULTIPLE SPOT AND STALK OPPORTUNITIES.</li>
            <li>SAFARI STYLE HUNTING FROM UTV'S</li>
            <li>ADDITIONAL HOGS CAN BE ADDED AT ANYTIME FOR  $1.50 PER POUND.</li>
            <li>SKINNING, QUARTERING AND STORAGE OF YOUR MEAT IS AVAILABLE TO YOU AT NO ADDITIONAL COST.</li>
            <li>DAY HUNTS ARE AVAILABLE. FOR $1.50 A POUND.</li>
            <li>AN ADDITIONAL NIGHT STAY IS OPTIONAL FOR $105.00 PER NIGHT AND IS BASED ON AVAILABILITY.</li>
            <li>A $600.00 NON-REFUNDABLE DEPOSIT IS REQUIRED  TO RESERVE THE DATES OF YOUR HUNTS, REGARDLESS OF HUNTING PARTY SIZE</li>
            <li>FOOD PACKAGE CAN BE ADDED FOR $200.00 PER HUNTER WHICH WILL TAKE CARE OF FOOD, SNACKS, AND DRINKS FOR EACH HUNTER THE DURATION OF YOUR STAY. </li>
         </ul>
        </Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={hogpic} />
    </Card>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
          <Card>
      <Card.Header as="h5">RAMS PACKAGE</Card.Header>
      <Card.Body>
        <Card.Title>PRICES ARE SUBJECT TO AVAILABILITY AND ARE ALL BASED ON SIZE. </Card.Title>
        <Card.Text>
         <ul>
            <li>MATURE AOUDAD RAM - $2,900.00-$6,500 </li>
            <li>MATURE AOUDAD EWE- $1,500-$2,200.00 </li>
            <li>MATURE MOUFLON RAM - $2,500-$5,500 </li>
            <li>CATALINA - $1,500.00-$5,900.00</li>
            <li>BLACK HAWAIIAN - $1,500-$2,100.00</li>
            <li>PAINTED DESERT - $1,500- $2,100.00</li>
            <li>OTHER RAMS ARE AVAILABLE. PLEASE CALL FOR PRICING</li>
            <li>ALL RAM PACKAGES INCLUDE A 3 DAY, 2 NIGHT STAY.</li>  
            <li>HOGS AND OTHER ANIMALS CAN BE ADDED TO THESE PACKAGES. </li>
         </ul>
        </Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={rampic} />
    </Card>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
    </Container>
  )
}
