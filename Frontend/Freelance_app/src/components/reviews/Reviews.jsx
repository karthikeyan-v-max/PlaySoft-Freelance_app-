import React from 'react'
import "./reviews.css"
import { Review } from '../review/Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

export const Reviews = ({gigId}) => {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
  const queryclient = useQueryClient();

  const {isLoading , error , data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/review/${gigId}`).then((res) =>{
        return res.data;
      })
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/review" , review)
    },
    onSuccess:()=>{
      queryclient.invalidateQueries(["reviews"])
    },
    onError:(err)=>{
      console.log(err)
    }
  });


  const handleSubmit =(e)=>{
    e.preventDefault()
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({gigId , desc , star})
  }
  return (
    <div className="reviews-1-gig">
            <h2>Reviews</h2>
            {isLoading ? "wait I'll one thing": error ? `Something went wrong ${error}` : data.map((review)=>(
              <Review key={review._id} review={review}/>
            ))}
            {mutation.isPending?"wait a second.." : mutation.isError? "something went wrong or you may be the Seller" :
              <div className='add-1-review'>
                <h3>Add a Review</h3>
                <form action="" className="addForm" onSubmit={handleSubmit}>
                  <input type="text" placeholder='Add your thoughts' />
                  <select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <button className='reviews-1-button'>send</button>
                </form>
              </div>}
    </div>
  )
}
