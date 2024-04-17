import express from 'express';
const router= express.Router()
import { verifyToken } from './../utils/verifyUser.js';
import { createComment } from '../controllers/commentController.js';

router.post('/create', verifyToken, createComment);
export default router