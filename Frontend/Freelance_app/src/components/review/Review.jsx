import React from 'react'
import "./review.css"
import { useMutation, useQuery } from '@tanstack/react-query';

import noavatar from "../../images/noavatar.png"
import newRequest from '../../utils/newRequest';

export const Review = ({review}) => {

  const {isLoading , error , data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) =>{
        return res.data
      })
  });

  return (
    <div className='review-item-1-gig'>
              {
                isLoading ? "Loading..." : error ? `something went wrong and ${error}` :
                <div className="user-1-gig">
                  <img className = "pp-3-gig" src={data.img || noavatar} alt="" />
                  <div className="info-1-gig">
                    <span>{data.username}</span>
                    <div className='country-1-gig'>
                      <span>{data.country}</span>
                    </div>
                  </div>
                </div>
              }
              
            <div className="star-1-gig">
              {Array(review.star).fill().map((item , i)=>(
                <img src="/images/star.png" alt="" key={i}/>
              ))}
              <span>{review.star}</span>
            </div>
              <p>
                {review.desc}
              </p>
              <div className="helpful-1-gig">
                <span>Helpful</span>
                <img src="/images/like.png" alt="" />
                <span>Yess</span>
                <img src="/images/dislike.png" alt="" />
                <span>No</span>
              </div>
              
            </div>
            
  )
}
