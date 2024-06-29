const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require("./routes/user.route")
const conversationRoute = require("./routes/conversation.route")
const gigRoute = require("./routes/gig.route")
const messageRoute = require("./routes/message.route")
const orderRoute = require("./routes/order.route")
const reviewRoute = require("./routes/review.route")
const authroute = require("./routes/auth.route")
const cookieParser = require("cookie-parser")
const cors = require('cors')


dotenv.config()

const connectWithRetry = async() => {
  try{
    await mongoose.connect( process.env.MONGO );
    console.log("winner winner chicken dinner !!!!!!");
  }catch(err){
    console.log("failed to connect to mongoDB on startup - retrying in 5 seconds");
    setTimeout(connectWithRetry , 5000)
  }
};
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173" , credentials:true}))


app.use("/api/auth",authroute)
app.use("/api/users",userRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/message",messageRoute);
app.use("/api/order",orderRoute);
app.use("/api/review",reviewRoute);
app.use("/api/gigs",gigRoute);

//error handling middleware
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  if (err.message === "Operation `users.findOne()` buffering timed out after 10000ms"){
    err.message = "Your database is not connected or cannot get the User from the database"
  }
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
})

app.listen(port,()=>{
  console.log(`hey man I'm running at port ${port} so you go continue your work`);
  connectWithRetry();
}) 
