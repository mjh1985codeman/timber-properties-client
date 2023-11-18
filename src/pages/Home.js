import React from "react";
import Auth from '../helpers/auth';
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
    <blockquote class="text-white text-3xl md:text-md 3xl:text-lg glow">
  Kick Your Feet Up
</blockquote>
    </div>     
      <div className='home-pic-content'>
      <Card.Img className="home-img" src={homPic} alt="A beautiful cabin in the snowy woods on a lake." />
        <Card.Title><h2 className='pic-title'>We have the Properties that are perfect for your next get away.</h2></Card.Title>
        {Auth.loggedIn() ? (
                  <a className='proplink' href={`/properties`}>
                  <h2>View Properties</h2>
                  </a>  
        ) : (
          <>
  <button className="big-disclaimer glow" onClick={() => {navigate('/login')}}>
    <span class="glow ping relative flex h-3 w-3">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-700 opacity-75"></span>
</span>
Login to book your reservation today!
  <span class="relative inline-flex rounded-full h-3 w-3 "></span>
    </button>
          </>
        )}
        </div>
    </Container>
  );
};

export default Home;