import express from 'express';
const router= express.Router()
import { verifyToken } from './../utils/verifyUser';
import { createComment } from '../controllers/commentController';

router.post('/create', verifyToken, createComment);