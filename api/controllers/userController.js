import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from './../utils/error.js';

export const test = (req, res) => {
    res.json({ success: 'Api is working', message: 'Test is working' });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res.status(401).json({ message: 'You are not authorized to perform this action' });
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return res.status(400).json({ message: 'Username must be between 7 and 20 characters long' });
        }
        if (req.body.username.includes(' ')) {
            return res.status(400).json({ message: 'Username cannot contain spaces' });
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return res.status(400).json({ message: 'Username must be lowercase' });
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).json({ message: 'Username can only contain letters and numbers' });
        }
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        }, { new: true });
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
        console.log(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return res.status(401).json({ message: 'You are not authorized to perform this action' });
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token')
            .status(200)
            .json('User has been signed out');
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'You are not authorized to perform this action' });
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortBy = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find()
            .sort({ createdAt: sortBy })
            .skip(startIndex)
            .limit(limit);
        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });
        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        });
    } catch (error) {
        next(error);
    }
};
export const getUser= async(req,res,next)=>{
    try {
        const user= await User.findById(req.params.userId)
        if(!user){
            return next(errorHandler(404,'User not found'))
        }
        const {password,...rest}=user._doc;
        res.status(200).json(rest)
    } catch (error) {
        
    }
}