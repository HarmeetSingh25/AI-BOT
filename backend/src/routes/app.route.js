import { Router } from "express";
import passport from "passport";
import { googleAuthCallback } from "../controller/auth.controller.js";
const Authroutes = Router();

Authroutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

Authroutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log(req.user); // debug

    const email = req.user?.emails?.[0]?.value;

    if (!email) {
      return res.status(400).json({ message: "Email missing" });
    }

    res.redirect("http://localhost:5173/home");
  }
);
export default Authroutes;
