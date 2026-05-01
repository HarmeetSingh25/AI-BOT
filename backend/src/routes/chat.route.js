import { Router } from "express";
import {  authmiddleware,  } from "../middleware/auth.middleware.js";
import { handleMessage } from "../controller/chat.controller.js";

const chatRouter = Router();

chatRouter.post("/", authmiddleware, handleMessage);


export default chatRouter;