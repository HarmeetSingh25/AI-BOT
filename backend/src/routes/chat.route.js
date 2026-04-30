import { Router } from "express";
import { authmiddleware } from "../middleware/auth.middleware";
const chatRouter = Router();

chatRouter.post("/messages", authmiddleware, handleMessages);

export default chatRouter;
