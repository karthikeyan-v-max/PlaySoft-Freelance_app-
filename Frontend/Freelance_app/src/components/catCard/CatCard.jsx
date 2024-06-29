import React from 'react'
import { Link } from 'react-router-dom';
import "./CatCard.css"
import { cards } from '../../data';

const CatCard = ({item}) => {
  return (
    <Link to = "/gigs">
        <div className='catCard'>
            <img src={item.img} className='cartimg'/>
            <span className='desc'>{item.desc}</span>
            <span className='title'>{item.title}</span>
        </div>
    </Link>

  )
}

export default CatCard