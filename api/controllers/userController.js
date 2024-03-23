import bcrypt from 'bcryptjs'; 
import User from '../models/userModel.js';
export const test=(req,res)=>{
    res.json({success:'Api is working',message:'Test is working'})
}

export const updateUser = async(req,res)=>{
    if(req.user.id !== req.params.userId){
        return res.status(401).json({message:'You are not authorized to perform this action'})
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return res.status(400).json({message:'Password must be at least 6 characters long'})
        }
        req.body.password = bcrypt.hashSync(req.body.password,10)

    }
    if(req.body.username){
        if(req.body.username.length <7 || req.body.username.length > 20){
            return res.status(400).json({message:'Username must be between 7 and 20 characters long'})
        }
        if(req.body.username.includes(' ')){
            return res.status(400).json({message:'Username cannot contain spaces'})
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return res.status(400).json({message:'Username must be lowercase'})
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return res.status(400).json({message:'Username can only contain letters and numbers'})
        }
    }
        try {
           const updateUser= await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
            }
           },{new:true}); 
           const { password,...rest}= updateUser._doc;
           res.status(200).json(rest);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    export const deletUser = async(req, res) =>{
        if(req.user.id !== req.params.userId){
            return res.status(401).json({message:'You are not authorized to perform this action'})
        }
        try {
            await User.findByIdAndDelete(req.params.userId)
            res.status(200).json({message:'User deleted successfully'})
        } catch (error) {
            next(error)
        }
    }

     export const signOut= (req, res,next) => {
try {
    res.clearCookie('access_token')
    .status(200)
    .json('User has been signed out')
} catch (error) {
    next(error)
}
     }