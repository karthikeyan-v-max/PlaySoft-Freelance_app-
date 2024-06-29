import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js"
import {useParams} from "react-router-dom";
import "./Pay.css";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm.jsx";

const stripePromise = loadStripe("pk_test_51PWHDA2NDbDZaGgVXwNA7mPwQnhpn3HJnZ342WvPRRucfC0YxAQbfu6lbdX7GYgN22KYqpuub3ril3tSySerm58F000rY3hYwl");

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id} = useParams()
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        const makePaymentRequest = async() => {
            try{
                const res = await newRequest.post(`/order/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            }catch(err){
                console.log(err.response);
            }
        };

        makePaymentRequest();
    }, []);

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

      return (
        <div className="pay">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      );
}

export default Pay