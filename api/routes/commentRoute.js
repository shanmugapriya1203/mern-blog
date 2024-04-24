import express from 'express';
const router= express.Router()
import { verifyToken } from './../utils/verifyUser.js';
import { createComment, editComment, getPostComments, like } from '../controllers/commentController.js';

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyToken,like);
router.put('/editcomment/:commentId',verifyToken,editComment)
export default router