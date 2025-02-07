import express from "express";
//import the express

import {login,signup,logout,updateProfile,checkAuth} from "../controllers/auth.controller.js"

import { protectRoute } from "../middleware/auth.middleware.js";



//import the controller functions
const router =express.Router();
 //assign the expressrouter function to a variable

router.post("/signup",signup);
//sigup route handler
router.post("/login",login);
//login route handler

router.post("/Logout",logout);
//logout route handler

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth)

router.get("/test",(req,res)=>{res.send("Hello")});

export default router;