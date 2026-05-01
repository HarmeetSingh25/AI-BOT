import userModel from "../models/user.models.js";

export async function findUserBYEmailid(email){
const user = await userModel.findOne({email})
return user
}
export async function createUser({email , fullname}) {
    const newuser = await userModel.create({
        email, fullname
    })
    return newuser 
}