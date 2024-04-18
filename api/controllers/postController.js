import { errorHandler } from "../utils/error.js";
import Post from './../models/postModel.js';

export const create = async (req, res, next) => {
    try {

        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You do not have permission to create a post'));
        }

        if (!req.body.title || !req.body.content) {
            return next(errorHandler(400, 'Please fill all the fields'));
        }

        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category, // Assuming you want to save the category as well
            image: req.body.image, // Assuming you want to save the image URL as well
            slug,
            userId: req.user.id,
            username: req.body.username, // Save the username from req.body
            profilePicture: req.body.profilePicture, // Save the profile picture from req.body
        });

        const savedPost = await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
  
        next(error);
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        }).sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);
        const totalPosts = await Post.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.query.userId) {
        return res.status(401).json({ message: 'You are not authorized to perform this action' });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
                category: req.body.category,
            }
        }, { new: true });
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.query.userId) {
        return res.status(401).json({ message: 'You are not authorized to perform this action' });
    }
    try {
        await Post.findByIdAndDelete(req.body.postId);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        next(error);
    }
};
