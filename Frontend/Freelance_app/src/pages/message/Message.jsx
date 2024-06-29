import React from "react";
import { Link, json, useParams } from "react-router-dom";
import "./Message.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
  const {id} = useParams();

  const queryclient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages' , id],
    queryFn: () =>
      newRequest.get(`/message/${id}`).then((res) => res.data)
  });
  
  const mutation = useMutation({
    mutationFn: (messagecontent) => {
      return newRequest.post(`/message` , messagecontent)
    },
    onSuccess:()=>{
      queryclient.invalidateQueries(['messages' , id])
    },
    onError: (error) => {
      console.error("Error posting message:", error.response ? error.response.data : error.message);
    }
  });

  const handleSend = (e) =>{
    e.preventDefault();
    if (!id) {
      console.error("Conversation ID is missing.");
      return;
    }
    const messageContent = {
      conversationId: id,
      desc: e.target[0].value,
    };
    mutation.mutate(messageContent);
    e.target[0].value = ""
  };
  

  return (
    <div className="message">
      <div className="container-1-message">
        <span className="breadcrumbs-1-message">
          <Link to="/messages">Messages</Link> {"> John Doe >"}
        </span>
        { isLoading? "Loading..." : 
          error ? "something went wrong!!!" : 
          <div className="messages-1-message">
            {data.map((m) =>(
              <div className={m.userId === currentUser._id ? "owner-1-message item-1-message" : "item-1-message"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>}
        <hr />
          <form onSubmit={handleSend} className="write-1-message">
            <textarea type="text" name= "message" placeholder="write a message" />
            <button type="submit">Send</button>
          </form>
        
      </div>
    </div>
  );
};

export default Message;