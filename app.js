import mongoose from "mongoose";
import express from "express";
import userRouter from "./routers/userRoutes.js";
import contactRoute from "./routers/contactRoute.js";

// Connect to MongoDB
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://jmuhumuza:UpzZv07X3JfHhdtA@cluster0.p0muz78.mongodb.net/").then(()=>{
    console.log("Connected to MongoDB");
    
})

//routes
app.use('/', userRouter);
app.use('/', contactRoute)


// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

