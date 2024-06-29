import React, { useEffect, useReducer, useRef, useState } from 'react'
import "./Gigs.css"
import GigCart from "../../components/gigcart/GigCart"
import {useQuery} from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

const Gigs = () => {
  const {search} = useLocation();
  const [open , setOpen] = useState(false)
  const [sort , setSort] = useState("sales")
  const minref = useRef()
  const maxref = useRef()

  const resort =(type)=>{
    setSort(type)
    setOpen(false)
  }
  console.log(location)

    const {isLoading , error , data , refetch} = useQuery({
      queryKey: ['gigs'],
      queryFn: () =>
        newRequest.get(`/gigs?${search}&min=${minref.current.value}&max=${maxref.current.value}&sort=${sort}`).then((res) =>{
          return res.data
        })
    });
    const apply = ()=>{
      refetch();
    }
    useEffect(()=>{
      refetch()
    },[sort])
    
    
  return (
    <div className='gigs'>
      <div className="containergig">
          <span className='breadcrumbs'>{` FIVERR > GRAPHICS & DESIGN > `}</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menugig">
          <div className="leftgig">
            <span>Budget</span>
            <input type ="text" placeholder='min' ref={minref}/>
            <input type='text' placeholder='max' ref={maxref}/>
            <button className='apply' onClick={apply}>Apply</button>
          </div>
          <div className="rightgig">
            <span className='sortBy'>SortBy</span>
            <span className='sorttype'>{sort==="sales"?"Best Selling":"Newest"}</span>
            <img src="./images/down.png" alt="" onClick={()=>setOpen(!open)}/>
              {open && <div className='rightMenu'>
                {sort==="sales"?<span onClick={()=> resort("createdAt")}>Newest</span>:
                <span onClick={()=> resort("price")}>price</span>}
              </div>}
          </div>
        </div>
        <div className="cards">
          {isLoading? "...Loading" : error ? "something went wrong!!!": data && data.length > 0 ? 
          (
            data.map((gig) => <GigCart key={gig._id} item={gig} />)
          ) : (
            'No gigs found'
          )}
        </div>
      </div>
          
    </div>
  )
}

export default Gigs