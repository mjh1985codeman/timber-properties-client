
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './helpers/auth';

//Components and Pages.
import Navigation from "./components/Navigation";
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

const httpLink = createHttpLink({
  uri: 'https://gql-api-timber-properties.onrender.com/graphql',
});

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
      <Navigation>
        <NavItem to="/" text="Home"/>
        <NavItem to="/contact" text="Contact"/>
        <NavItem to="/properties" text="Properties"/>
        {Auth.isAdmin() ? (
          <NavItem to="/team" text="Team"></NavItem>
          ) : (null)}
        {!Auth.loggedIn() ? (
          <NavItem to="/login" text="Login"></NavItem>
          ) : (<NavItem to="/logout"text="LOGOUT"></NavItem>)}
      </Navigation>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/team" element={<Team/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/contact"element={<Contact/>} />
        <Route path="/properties"element={<Properties/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/properties/addproperty" element={<AddProperty/>} />
        <Route path="/properties/:propertyId" element={<PropertyDetails/>}/>
        <Route path="/reserve/:propertyId" element={<ReserveProperty/>}/>
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
