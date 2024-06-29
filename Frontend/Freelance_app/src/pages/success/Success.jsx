import React, { useEffect } from 'react'
import {useLocation , useNavigate} from "react-router-dom"
import newRequest from "../../utils/newRequest.js"
import "./success.css"

const Success = () => {
  const {search} = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(()=>{
    const makeRequest = async()=>{
      try{
        await newRequest.put("/order",{payment_intent});
        setTimeout(()=>{
          navigate("/orders");
        },2000);
      }catch(err){
        console.log(err.message);
      }
    };

    makeRequest()
    
  },[])
  
  return (
    <div className='success'>
      <p>Your payment was Successfull please wait a minute you will be redirected to the orders page</p>
    </div>
  )
}

export default Success