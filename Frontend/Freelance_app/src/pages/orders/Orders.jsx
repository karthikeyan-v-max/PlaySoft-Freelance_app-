import React from 'react'
import "./Orders.css"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import messageImg from "../../images/message.png"
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()

const {isLoading , error , data } = useQuery({
  queryKey: ['order'],
  queryFn: () =>
    newRequest.get(`/order`).then((res) =>{
      return res.data
    })
});


const handelContact = async(order) =>{

  const sellerId = order.sellerId;
  const buyerId = order.buyerId;
  const Id = sellerId + buyerId;
  console.log(sellerId)

  try{
    const res = await newRequest.get(`/conversation/single/${Id}`);
    if(res.data){
      navigate(`/message/${res.data.id}`)
    }
  }catch(err){
    if(err.response.status === 400){
      const res = await newRequest.post(`/converstation/`,{to : sellerId});
      navigate(`/message/${res.data.id}`)
    }
  }
}
  return (
    <div className='gigs-1-gigs'>
      {isLoading ? "loading..." : error ? "something went wrong" : 
      <div className="container-1-gigs">
        <div className='title-1-gigs'>
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {
            data.map((order) =>(
            <tr key={data._id}>
              <td>
                <img className="userimg-1-gigs" src={order.img} alt="" />
              </td>
              <td>{order.title}</td>
              <td>{order.price}</td>
              <td>
                <img className="delete-1-gigs" src={messageImg} alt="" onClick={() => handelContact(order)}/>
              </td>
          </tr>
          ))}
        </table>
      </div>}
    </div>
  )
}

export default Orders