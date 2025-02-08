import express from "express";


const router =express.Router();

router.get("",protectRoute,getUsers)