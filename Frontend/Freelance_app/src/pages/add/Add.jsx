import React, { useReducer, useState } from "react";
import "./Add.css";
import { INITIAL_STATE, gigReducer } from "../../Reducers/gigReducer";
import upload from "../../../../../Backend/api/utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js"
import {useNavigate} from "react-router-dom"

const Add = () => {
  const [singelFile , setSingleFile] = useState(undefined);
  const [files , setFiles] = useState([]);
  const [uploading , setUploading] = useState(false)


  const [state , dispatch] = useReducer(gigReducer , INITIAL_STATE);

  const handleChange = (e) =>{
     dispatch({
      type: "CHANGE_INPUT",
      payload : { name: e.target.name , value : e.target.value},
     });
  };
  
  const handleFeature = (e) =>{
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload : e.target[0].value,
    });
    e.target[0].value = "";
  }

  const handleUpload = async(e) =>{
    setUploading(true);
    try{
      const cover = await upload(singelFile)
      const images = await Promise.all(
        [...files].map(async (file)=>{
          const url = await upload(file);
          return url
        })
      );
      dispatch({type:"ADD_IMAGES" , payload : { cover:cover , images:images}})
      setUploading(false);
      
    }catch(err){
      console.log(err);
    }
  }

  const navigate = useNavigate()
  const queryclient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs" , gig)
    },
    onSuccess:()=>{
      queryclient.invalidateQueries(["mygigs"])
    },
    onError:(err)=>{
      console.log(err)
    }
  });
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs")
  }

  return (
    <div className="add-1-add">
      <div className="container-1-add">
        <h1>Add New Gig</h1>
        <div className="sections-1-add">
          <div className="info-1-add">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cats-1-add" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images-1-add">
              <div className="imagesInputs-1-add">
                <label htmlFor="">Cover Image</label>
                <input type="file"name="cover" onChange={e=>setSingleFile(e.target.files[0])}/>
                <label htmlFor="">Upload Images</label>
                <input type="file" name="images" multiple onChange={e=>setFiles(e.target.files)}/>
              </div>
              {uploading?"Uploading....." : <button onClick={handleUpload}>Upload</button>}
            </div>
            <label htmlFor="">Description</label>
            <textarea name="desc" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16" onChange={handleChange}></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details-1-add">
            <label htmlFor="">Service Title</label>
            <input type="text" name="shortTitle" 
              placeholder="e.g. One-page web design" onChange={handleChange}/>
            <label htmlFor="">Short Description</label>
            <textarea name="shortDesc" onChange={handleChange} id="" placeholder="Short description of your service" cols="30" rows="10"></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange}/>
            <label htmlFor="">Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange}/>
            <label htmlFor="">Add Features</label>
            <form onSubmit={handleFeature} className="form-1-add">
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures-1-add">
              {state?.features?.map((f)=>(
                <div className="item-1-add" key={f}>
                  <button onClick={()=>dispatch({ type : "REMOVE_FEATURE" , payload : f})}>
                    {f}
                    <span>X</span>
                  </button>
              </div>))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;