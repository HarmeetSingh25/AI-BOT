import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../src/config/config.js";
import Authroutes from "./routes/app.route.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// console.log(config.clientID , config.clientSecret , "this test");
// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: "http://localhost:5173/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    },
  ),
);

app.use('/api/auth', Authroutes);
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
