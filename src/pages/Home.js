import React from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import homPic from '../assets/home-pic.jpg';


const Home = () => {
  
  return (
    <Container>
    <div className="home-title-div">
    <h1 className="home-title">Timber Properties</h1>
    </div>
    <div className="home-quote">  
    <h2>"A place to kick your feet up."</h2>
    </div>     

    <Card className="bg-dark text-white">
      <Card.Img className="gate-img" src={homPic} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title><h2 className='pic-title'>About Timber Properties</h2></Card.Title>
        <Card.Text className='pic-txt'>
          Our company is dedicated to offering a wide range of properties in the vast outdoors.
          Whether you're planning a romantic retreat, a family vacation, or a group gathering, we have the perfect property to fit your needs. Our properties are carefully selected and managed to ensure that every guest enjoys a comfortable and stress-free stay in a beautiful and peaceful setting.
          Our team is committed to providing exceptional service, and we are always available to help you with any questions or concerns you may have before, during, or after your stay.
          Thank you for considering our company for your next getaway. 
          We look forward to helping you create unforgettable memories in the stunning mountain destinations we proudly serve. 
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    </Container>
  );
};

export default Home;