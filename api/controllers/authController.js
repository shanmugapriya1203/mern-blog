import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
export const signup= async(req,res)=>{
const {username,email,password} = req.body
if(!email || !password || !username)
{
    return res.status(400).json({error:'Please fill all the fields'})
}
const hashedPassword= bcrypt.hashSync(password,10)
const newUser= new User({
    username,
    email,
    password:hashedPassword
})
try {
    await newUser.save()
    res.json({message:'Signup successful'}) 
} catch (error) {
   res.json(500).json({message:error.message})
}



}