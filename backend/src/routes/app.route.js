import { Router } from "express";
import { googleAuthCallback } from "../controller/auth.controller";
const Authroutes = Router();

Authroutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback route that Google will redirect to after authentication
Authroutes.get(
  "/google/callback",
  passport.authenticate("google", 
    { session: false }),
googleAuthCallback
);

export default Authroutes;
