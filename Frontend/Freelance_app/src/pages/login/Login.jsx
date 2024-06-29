import React, { useState } from 'react'
import "./Login.css"
import newRequest from '../../utils/newRequest'
import { useNavigate } from "react-router-dom";
import upload from '../../../../../Backend/api/utils/upload';
const Login = () => {
  const navigate = useNavigate()
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const [error , setError] = useState(null)
  const [loading , setLoading] = useState(false)
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      setError(null)
      setLoading(true)
      const res = await newRequest.post("/auth/login",{
        username,
        password
      })
      console.log(res)
      localStorage.setItem("CurrentUser", JSON.stringify(res.data))
      navigate("/")
      
    }catch (err){
      setError(err.response.data)
    }finally{
      setLoading(false)
    }
  }
     
  return (
    <div className='login'>
    <div className='login-1-container'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className='login-1-username'>
          <label htmlFor="">Username</label>
          <input type="text" name='username' placeholder='karthikeyan' onChange={e=>setUsername(e.target.value)}/>
        </div>

        <div className='login-1-password'>
          <label htmlFor="">Password</label>
          <input type="password" name='password' placeholder='password@123' onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className='login-1-button'>
          <button type='submit'>Login</button>
        </div>
        
        <div className='loading'>
          <h3>
            {loading && "loading ...."}
            {error && error}
          </h3>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login