import * as utils from "../utils/utils.js";
import * as userDao from "../dao/user.dao.js";
import { fa } from "zod/v4/locales";

export const googleAuthCallback = (req,res)=>{
const userdata = req.user
// console.log( "this is user data from google",req.user );
const user = userDao.findUserBYEmailid(userdata.emails[0].value

)
if(!user){
    userDao.createUser({
        fullname:userdata.displayname,
        email:userdata.email[0].value
    })
}
const token = utils.protectJWT({ id: userdata._id , fullname :user.fullname})
console.log("this is token from protectJWT",token);

res.cookie("token" , token , {
    httpOnly:true,
    secure:true, 
    sameSite:"strict"
})
res.redirect("http://localhost:5173")
}