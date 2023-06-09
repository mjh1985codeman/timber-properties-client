import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';

import CheckoutFormForDp from "./CheckoutFormForDp";

const { GET_STRIPE_CLIENT_SECRET } = require('../controllers/queries');

const stripePromise = loadStripe("pk_test_51NGYmhGwX86etaomB8TYWoWvlGCtVnyOni9abfA45VV3bS2CRpd0UMkyT1vPZM6Ic4ys4NwjUnJTo4ugIPrbnvka00E0gU3A2q");

export default function CheckoutDownPayment() {
  const [clientSecret, setClientSecret] = useState("");
  const [downPaymentAmount, setDownPaymentAmount] = useState("");

  const location = useLocation();
  const resDetailsForDp = location.state?.resDPCheckout || "No Res Details.";
  console.log(resDetailsForDp);

  const { loading, error, data } = useQuery(GET_STRIPE_CLIENT_SECRET, {
    variables: { resDetails: {
        resDownPaymentAmount: parseFloat(downPaymentAmount.replace(/[$,]/g,""))
    } },
  });

  useEffect(() => {
    if (resDetailsForDp.totalPrice) {
      setDownPaymentAmount(resDetailsForDp.totalPrice);
    }

    if (data) {
      const stripeSecret = data.getClientSecret;
      setClientSecret(stripeSecret);
    }
  }, [resDetailsForDp, downPaymentAmount, data]);

  if(loading) {
    return '...loading'
  };

  if(error) {
    console.log('there was an error: ' , error);
  };

  const appearance = {
    theme: 'stripe',
  };
  
  const options = {
    layout: 'accordian',
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutFormForDp resInfo={resDetailsForDp}/>
        </Elements>
      )}
    </div>
  );
}