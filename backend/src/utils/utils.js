import jwt, { decode } from "jsonwebtoken";
import config from "../config/config.js";
export function protectJWT(data) {
  const token = jwt.sign(data, config.jwtSecret, { expiresIn: "7d" });
  return token
}

export function verifyJWT(data){
    try {
        
        let decoded = jwt.verify(data , config.jwtSecret)
        return decoded
    } catch (error) {
    console.log("Invalid token" , error);
        return null
    }
}