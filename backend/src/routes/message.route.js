import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";

import { getUsersForSidebar,getMessages,sendMessage } from "../controllers/message.controller.js";

const router =express.Router();

router.get("/users",protectRoute,getUsersForSidebar);
// get all the users
router.get("/:id",protectRoute,getMessages);
//get all the messages from a specific user ID of that user
router.post("/send/:id",protectRoute,sendMessage);
//send all the messages to apecific user with an ID
export default router;