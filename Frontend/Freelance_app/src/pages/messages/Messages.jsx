import React from 'react'
import { Link } from 'react-router-dom'
import "./Messages.css"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import moment from "moment"

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
  const queryclient = useQueryClient();

  const { isLoading: isLoadingConversation, error: conversationError, data: conversationData } = useQuery({
    queryKey: ['conversation'],
    queryFn: () =>
      newRequest.get(`/conversation`).then((res) => res.data)
  });
  

  const userid = conversationData ? (currentUser?.isSeller ? conversationData[0].buyerId : conversationData[0].sellerId) : null;

  
  const { isLoading: isLoadingUser, error: userError, data: userData } = useQuery({
    queryKey: ['username' , userid],
    queryFn: () =>
      newRequest.get(`/message/${id}`).then((res) => res.data)
  });
  

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversation/${id}`)
    },
    onSuccess:()=>{
      queryclient.invalidateQueries(['conversation'])
    },
    onError:(err)=>{
      console.log(err)
    }
  });
  
  const handleRead = (id) => {
    try{
      mutation.mutate(id)
    }catch(err){
      console.log(err);
    }
    
  }
  return (
    <div className='gigs-1-messages'>
      { isLoadingConversation ? "Loading ... " : conversationError ? "something went wrong" : 
      <div className="container-1-gigs">
        <div className='title-1-gigs'>
          <h1>Messages</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>{currentUser?.isSeller? "Buyer" : "Seller"}</th>
              <th>Last Messages</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {conversationData.map((c) =>
          (
          
            <tr className={(((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && 'active-1-messages').toString()} key={c._id}>
              <td>
                {userData?.username || (currentUser.isSeller ? c.buyerId : c.sellerId)}
              </td>
              <td>
                <Link to={`/message/${c.id}`} className='link'>
                  {c?.lastMessages?.substring(0 , 100)}...
                </Link>
              </td>
              <td>
                {moment(c.updatedAt).fromNow()}
              </td>
              <td>{((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && (
                <button onClick={()=>handleRead(c.id)}>Mark as Read</button>
              )}
              </td>
          </tr> 
        ))}
          </tbody>
        </table>
      </div>}
    </div>
  )
}

export default Messages