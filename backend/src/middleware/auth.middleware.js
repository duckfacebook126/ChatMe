
import dotenv from "dotenv";

import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import mongoose from "mongoose";


dotenv.config();

export const protectRoute= async(req,res,next)=>{

    try {
     const token =req.cookies.jwt;

     //get token from cookies '  jwt object
     
     if(!token)
     {
        return res.status(401).json({message:"unauthorized- No Token Provided"});

     }

     const decoded= jwt.verify(token,process.env.JWT_SECRET);
     //decode the token

     if(!decoded)
     {
        return res.status(401).json({message:"Unauthorized - Invalid Token"});
     }

     const user =await User.findById(decoded.userId).select("-password");
     //check for user with the token in the database

     if(!user)
     {
        return res.status(404).json({message:"User Not found"});
     }

     req.user=user;
     //in the req objewct create the user object aand assign the user document to it
     next();
     //handle the control to the next route handler function
    } 
    
    
    catch (error)
     {
        console.log("error from the middleware protetRoute Function",error);

        res.status(500).json({message:"Internal Server Error"});
    }

}

//this function will protect the routes and check if the user is authenticated or notby checking the user toen validity