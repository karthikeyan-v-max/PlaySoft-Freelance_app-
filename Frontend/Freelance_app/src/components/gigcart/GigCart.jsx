import React from 'react'
import "./gigcart.css"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import newRequest from "../../utils/newRequest"
import noavatar from "../../images/noavatar.png"
const GigCart = ({item}) => {
    const {isLoading , error , data } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
          newRequest(`/users/${item.userId}`).then((res) =>{
            return res.data
          })
      });
      
  return (
    <Link to= {`/gigs/single/${item._id}`} className='link'>
        <div className='gigCard'>
            <img src={item.cover} alt="" />
            <div className='infog'>
                {isLoading? "loading..." : error ? `${error}` : 
                (<div className="userg">
                    <img src={data?.img || noavatar} alt="" />
                    <span>{data?.username}</span>
                </div>)}
                <p>{item.desc}</p>
                <div className='starg'>
                    <img src="./images/star.png" alt="" />
                    <span>
                        {
                        !isNaN(Math.round(item.totalStars/item.stars)) && 
                        Math.round(item.totalStars/item.stars)
                    }
                    </span>
                </div>
            </div>
            <hr />
            <div className="detailsg">
                <img src="./images/heart.png" alt="" />
                <div className="priceg">
                    <span>STARTING AT</span>
                    <h2>${item.price}</h2>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default GigCart