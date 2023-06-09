
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './helpers/auth';


//Components and Pages.
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NavItem from "./components/NavItem";
import Properties from "./pages/Properties";
import Register from "./pages/Register";
import ReserveProperty from "./components/ReserveProperty";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Team from "./pages/Team";
import ReservationConfirm from "./components/ReservationConfirm";
import DownPayment from "./pages/DownPayment";
import ResetPWRequestComp from "./components/ResetPWRequestComp";
import ResetPWConfirm from "./components/ResetPWConfirm";
import UserReservations from "./pages/UserReservations";

//nav icons
import {HiLogin} from 'react-icons/hi'
import {HiHomeModern} from 'react-icons/hi2'
import {SiMaildotru} from 'react-icons/si'
import {BiBuildingHouse} from 'react-icons/bi'
import {RiTeamLine} from 'react-icons/ri'
import {GiExitDoor} from 'react-icons/gi'
import { GiMountains } from "react-icons/gi";


//Production: 
const httpLink = createHttpLink({
  uri: 'https://gql-api-timber-properties.onrender.com/graphql',
});

//Local Development:
// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
        <div className='navigation'>
        <NavItem to="/" text="Home" icon={<HiHomeModern/>}/>
        <NavItem to="/contact" text="Contact" icon={<SiMaildotru/>}/>
        <NavItem to="/properties" text="Properties" icon={<BiBuildingHouse/>}/>
        {Auth.isAdmin() ? (
          <NavItem to="/team" text="Team" icon={<RiTeamLine/>}></NavItem>
          ) : (null)}
        {Auth.loggedIn() ? (
          <NavItem to="/your-reservations" text="Your Reservations" icon={<GiMountains/>}></NavItem>
        ) : (null)}
        {!Auth.loggedIn() ? (
            <NavItem to="/login" text="Login" icon={<HiLogin/>}></NavItem>  
          ) : (
            <NavItem to="/logout"text="Logout" icon={<GiExitDoor/>}></NavItem>
          )}
        </div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/team" element={<Team/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/contact"element={<Contact/>} />
        <Route path="/properties"element={<Properties/>} />
        <Route path="/register" element={<Register/>}/>
        {Auth.loggedIn() ? (
          <>
            <Route path="/your-reservations" element={<UserReservations/>}/>
            <Route path="/reserve/:propertyId" element={<ReserveProperty/>}/>
            <Route path="/properties/addproperty" element={<AddProperty/>} />
            <Route path="/reserve/:propertyId/confirm" element={<ReservationConfirm/>}/>
          </>
        ) : (        
        <Route
          render={() => (
            <h1 className="display-2">
              You Must Be Logged In To See This Page.
            </h1>
          )}
        />)}
        <Route path="/properties/:propertyId" element={<PropertyDetails/>}/>
        <Route path="/requestpwreset" element={<ResetPWRequestComp/>}/>
        <Route path="/reset/:token" element={<ResetPWConfirm/>} />
        <Route path="/downpayment" element={<DownPayment/>}/>
     
        <Route
          render={() => (
            <h1 className="display-2">
              Oh My. . .You're lost. Try not to make up url routes because
              you have no idea where you'll end up! Play it safe and click
              on a link in the NavBar to get back on track.
            </h1>
          )}
        />
      </Routes>
  </Router>
  </ApolloProvider>
  );
}

export default App;
