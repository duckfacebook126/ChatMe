import express from "express";
//import the express

import {login,signup,logout} from "../controllers/auth.controller.js"
//import the controller functions
const router =express.Router();
 //assign the expressrouter function to a variable

router.get("/signup",signup);
//sigup route handler
router.get("/login",login);
//login route handler

router.get("/Logout",logout);
//logout route handler
export default router;