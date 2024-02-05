import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
export const signup= async(req,res,next)=>{
const {username,email,password} = req.body
if(!email || !password || !username)
{
next(errorHandler(400,'Please fill all the fields'))
}
const hashedPassword= bcrypt.hashSync(password,10)
const newUser= new User({
    username,
    email,
    password:hashedPassword
})
try {
    await newUser.save();
    res.json({ message: 'Signup successful' });  // Success response
} catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });  // Error response
    next(error);
}




}