import express from 'express';
const router= express.Router()
import { verifyToken } from './../utils/verifyUser.js';
import { createComment, deleteComment, editComment, getPostComments, getcomments, like } from '../controllers/commentController.js';

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyToken,like);
router.put('/editcomment/:commentId',verifyToken,editComment)
router.delete('/deletecomment/:commentId',verifyToken,deleteComment)
router.get('/getcomments', verifyToken, getcomments);
export default router