import React from 'react'
import "./Home.css"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/slide/Slide'
import { cards, projects } from '../../data'
import CatCard from '../../components/catCard/CatCard'
import ProjectCard from '../../components/productCard/ProjectsCard'
import ProductSlide from "../../components/slideforproduct/ProductSlide"
const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <Slide/>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>The best part? Everything</h1>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Stick to your budget
            </div>
            <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Get quality work done quickly
            </div>
            <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Pay when you're happy
            </div>
            <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Count on 24/7 support
            </div>
            <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
          </div>
          <div className="item">
            <video src="./images/video.mp4" className='video' controls></video>
          </div>
        </div>
      </div>

      <div className="features2">
        <div className="container">
          <div className="item2-left">
            <div className="head">
              <h1><span>PlaySoft</span> pro.</h1>
            </div>
            <div className='sub-head'>
              <h1>We're here for your e-Commerce everything</h1>
            </div>
              <div className="para">
              <p className='first'><span>Get a project manager</span> to guide you through each stage of launching your e-Commerce business</p>
              
              <p className='first'><span>Accelerate time-to-market</span> with a dedicated team of top-tier freelance experts</p>

              <p className='first'><span>Optimize your budget</span> with a dedicated project manager who will handle all your tasks, leaving you more money for marketing and growth</p>
              <button>Get Started</button>
            </div>
          </div>
          <div className="item2-right">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_800,dpr_1.0/v1/attachments/generic_asset/asset/f83cfb5f5b7cdfed1482b83c956bc561-1710925224537/lohp-pro.png" alt="" content=''/>
          </div>

        </div>
      </div>
      <ProductSlide/>
    </div>
  )
}

export default Home