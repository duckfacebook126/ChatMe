
import dotenv from "dotenv";
//import the dotenv for acesing the environment variables
dotenv.config();
//configure the dot env
import {app,server} from "./lib/socket.js"
import cors from "cors";
//import the cros orgin resources sharing for the cross orgin requests
import express from "express";
//creating an express object to initialize the app
import authRoutes from "./routes/auth.route.js";
//IMPORT THE AUTH ROUTES FROM THE auth.route.js

import messageRoutes from "./routes/message.route.js";
//message route imported from the message.route.js
 
import {connectDB} from "./lib/db.js";
//import thee db connection function to connect to the database

import cookieParser from "cookie-parser";



app.use(express.json());
//parsing the incoming json requests

app.use(cookieParser());

app.use(cors({credentials:true,origin:"http://localhost:5173"}));

app.use("/api/auth",authRoutes);
// for handling the requests and routes for the auth routes and redirects the auth routes to the authRoutes in the auth.route.js

app.use("/api/messages",messageRoutes);
//for handling the messages and related data



const PORT = process.env.PORT ;
 
server.listen(PORT,()=>
{

console.log(`Server is running on port ${PORT}`);
connectDB();
});
//this  will run the application on aa dedicated port number 