import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.json({ message: 'Signup successful' });  // Success response
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Internal server error' });  // Error response
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET_KEY
        );
        const { password: userPassword, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json({ ...rest, token }); 
    } catch (error) {
        next(error);
    }
}


export const google = async (req, res, next) => {
const { email ,name ,photoURL}=req.body;
try {
    const user= await User.findOne({email})
    if(user){
        const token= jwt.sign({id: user.id},process.env.JWT_SECRET_KEY)
        const {password,...rest}= user._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly: true,
        }).json(rest)
    }
    else{
        const generatedPassword= Math.random().toString(36).slice(-8)
        const hashedPassword= bcrypt.hashSync(generatedPassword,10)
        const newUser= new User({
            username:name.toLowerCase().split(' ').join(' ') + Math.random().toString(9).slice(-4),


            email,
            password:hashedPassword,
            profilePicture:photoURL,
        })
        await newUser.save()
        const token= jwt.sign({id: newUser.id},process.env.JWT_SECRET_KEY)
        const {password,...rest}= newUser._doc;
        res.status(200).cookie('access_token',token,{
            httpOnly: true,
        }).json(rest)
    }
} catch (error) {
    res.status(500).json({ message: 'Internal server error' });
}

}