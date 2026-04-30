import * as utils from "../utils/utils.js";
import * as userDao from "../dao/user.dao.js";

export const googleAuthCallback = (req,res)=>{
const userdata = req.user
const user = userDao.findUserBYEmailid(userdata.email[0].value
)
if(!user){
    userDao.createUser({
        fullname:userdata.displayname,
        email:userdata.email[0].value
    })
}
const token = utils.protectJWT(userdata._id)

res.cookies("token" , token , {
    httpOnly:true,
    secure:true,
    samesSite:Strict
})
res.redirect("http://localhost:5173")
}