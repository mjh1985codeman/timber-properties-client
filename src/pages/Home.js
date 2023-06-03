import React from "react";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import homPic from '../assets/cabin-in-the-woods.jpg';
import mainLogo from '../assets/timber-prop-logo.png';

import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();
  
  return (
    <Container className='home-container'>
    <div className="home-title-div">
    <img className ='home-logo' src={mainLogo} alt="a cabin in the snow."></img>
    </div>
    <div className="home-quote">  
    <h2>"A place to kick your feet up."</h2>
    </div>     

    <Card className="bg-dark text-white">
      <Card.Img className="home-img" src={homPic} alt="A beautiful cabin in the snowy woods on a lake." />
      <Card.ImgOverlay>
        <div className='home-pic-content'>
        <Card.Title><h2 className='pic-title'>About Timber Properties</h2></Card.Title>
        <Card.Text className='pic-txt'>
          We have the Properties that are perfect for your Vactation.
        </Card.Text>
        <div className="big-disclaimer home-disclaimer" onClick={() => {navigate('/login')}}>LogIn To Book your spot today!</div>
        </div>
      </Card.ImgOverlay>
    </Card>
    </Container>
  );
};

export default Home;