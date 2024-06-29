import React from 'react'
import { Link } from 'react-router-dom'
import "./MyGigs.css"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
const MyGigs = () => {


  const queryclient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
  


  const {isLoading , error , data } = useQuery({
    queryKey: ["mygigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) =>{
        return res.data;
      })
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`)
    },
    onSuccess:()=>{
      queryclient.invalidateQueries(["mygigs"])
    }
  });

  const handleDelete = (id) => {
    mutation.mutate(id)
  }
  return (
    <div className='gigs-1-gigs'>
      {isLoading ? "Loading..." : error ? "something went wrong" : 
      <div className="container-1-gigs">
      <div className='title-1-gigs'>
        <h1>Gigs</h1>
        <Link to="/add"><button>Add New Gig</button></Link>
      </div>
      <table>
        <thead>
        <tr>
          <th>Images</th>
          <th>Title</th>
          <th>Price</th>
          <th>Sales</th>
          <th>Action</th>
        </tr>
        </thead>
        
        {data.map((gig)=>(
          <tr key={gig._id}>
          <td>
            <img className="userimg-1-gigs" src={gig.cover} alt="" />
          </td>
          <td>{gig.title}</td>
          <td>{gig.price}</td>
          <td>{gig.sales}</td>
          <td>
            <img className="delete-1-gigs" src="/images/delete.png" alt="" onClick={()=>handleDelete(gig._id)}/>
          </td>
        </tr>
        ))}


      </table>
      </div>}
    </div>
  )
}

export default MyGigs