import React, { useState } from 'react';
import "./Featured.css"
import {useNavigate} from "react-router-dom"
const Featured = () => {
    const [input , setInput] = useState("");
    const navigate = useNavigate()
    const handleSearch = () =>{
        navigate(`/gigs?search=${input}`)
    }
  return (
    <div className='featured'>
        <div className='containerf'>
            <div className='left'>
                <h1>Find the right <span>freelance</span> service, right away</h1>
                <div className='search'>
                    <div className='searchInput'>
                        <img src="./images/search.png" alt="search icon" />
                        <input type="text" placeholder='Search for any Services' onChange={(e)=>setInput(e.target.value)}/>
                        
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className='popular'>
                    <span>Popular:</span>
                    <button>Website Design</button>
                    <button>WordPress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
            </div>
            <div className='right'>
                <img src="./images/man.png" alt="man image" />
            </div>
        </div>
    </div>
  )
}

export default Featured