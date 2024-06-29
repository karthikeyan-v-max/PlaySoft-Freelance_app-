import { Slider } from 'infinite-react-carousel'
import React from 'react'
import './Gig.css'
import { Link, useParams } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import { useQuery } from '@tanstack/react-query'
import noavatar from "../../images/noavatar.png"
import { Reviews } from '../../components/reviews/Reviews'
const Gig = () => {

  const {id} = useParams()

  console.log(id)
  const {isLoading , error , data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) =>{
        return res.data
      })
  });

  const userId = data?.userId

  const {isLoading:isUserLoading , error:isusererror , data:userData } = useQuery({
    queryKey: ['userdata'],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) =>{
        return res.data
      }),
      enabled: !!userId,
  });


  return (
    <div className="gig">
    {isLoading ? ("...Loading") : error ? ("something went wrong") : 
      <div className="container-1-gig">
        <div className="left-1-gig">
          <span className='breadcrumbs-1-gig'>FIVERR {">"} GRAPHICS & DESIGN {">"}</span>
          <h1>{data.title}</h1>
          {isUserLoading ? "...loading" : isusererror? "something went wrong" : 
          <div className="user-1-gig">
            <img className='pp-1-gig'
            src={userData.img || noavatar} alt="" />
            <span>{userData.username}</span>
            {!isNaN(data.totalStars/data.stars) &&
            (
            <div className="star-1-gig">
              {Array(Math.round(data.totalStars/data.stars)).fill().map((item , i)=>(
                <img src="/images/star.png" alt="" key={i}/>
              ))}
              <span>{Math.round(data.totalStars/data.stars)}</span>
            </div>
          )}
          </div>}
          <Slider slidesToShow={1} arrowScroll={1} className='slider-1-gig'>
            {data.images.map((img)=>(
              <img src={img} alt="" key={img}/>
            ))}
          </Slider>
          <h2>About This Gig</h2>
          <p>
            {data.desc}
          </p>

          { isUserLoading ? "...loading" : isusererror? "something went wrong" : 
          <div className="seller-1-gig">
            <h2>About the seller</h2>
            <div className="user-2-gig">
              <img  className = "pp-2-gig" src={userData.img || noavatar} alt="" />
              <div className="info-1-gig">
                <span>{userData.username}</span>
                {!isNaN(data.totalStars/data.stars) &&
            (
            <div className="star-2-gig">
              {Array(Math.round(data.totalStars/data.stars)).fill().map((item , i)=>(
                <img src="/images/star.png" alt="" key={i}/>
              ))}
              <span>{Math.round(data.totalStars/data.stars)}</span>
            </div>
          )}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box-1-gig">
              <div className="items-1-gig">
                <div className="item-1-gig">
                  <span className='title-1-gig'>From</span>
                  <span className='desc-1-gig'>{userData.country}</span>
                </div>
                <div className="item-1-gig">
                  <span className='title-1-gig'>Member Since</span>
                  <span className='desc-1-gig'>Aug 2022</span>
                </div>
                <div className="item-1-gig">
                  <span className='title-1-gig'>Avg. response time</span>
                  <span className='desc-1-gig'>4 hours</span>
                </div>
                <div className="item-1-gig">
                  <span className='title-1-gig'>Last delivery</span>
                  <span className='desc-1-gig'>1 day</span>
                </div>
                <div className="item-1-gig">
                  <span className='title-1-gig'>Language</span>
                  <span className='desc-1-gig'>Tamil</span>
                </div>
              </div>
              <hr />
                <p>
                  {userData.desc || "I am a Freelancer"}
                </p>
              
            </div>
          </div>}
          <Reviews gigId = {id}/>
        </div>
        <div className="right-1-gig">
          <div className="price-1-gig">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
            {data.shortDesc}
          </p>
          <div className="details-1-gig">
            <div className='item-2-gig'>
              <img src="/images/clock.png" alt="" />
              <span>{data.deliveryTime < 2 ?`${data.deliveryTime} day Delivery`:`${data.deliveryTime} days Delivery` }</span>
            </div>
            <div className='item-2-gig'>
              <img src="/images/recycle.png" alt="" />
              <span>{data.revisionNumber} reviews</span>
            </div>
          </div>
          <div className="features-1-gig">
            {data.features.map((feature) =>(
              <div className='item-3-gig' key={feature}>
              <img src="/images/greencheck.png" alt="" />
              <span>{feature}</span>
            </div>
            ))}
          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>}
    </div>
  )
}

export default Gig