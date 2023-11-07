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
    <blockquote class="text-base md:text-md 3xl:text-lg">
  Oh I gotta get on that internet, I'm late on everything!
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
          <button className="animate-pulse big-disclaimer home-disclaimer transition ease-in-out delay-100 bg-yellow-500 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-200 hover:skew-y-3" onClick={() => {navigate('/login')}}>Login to book your reservation today!</button> 
          </>
        )}
        </div>
    </Container>
  );
};

export default Home;