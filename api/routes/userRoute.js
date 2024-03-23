import express from 'express';
import { deletUser, signOut, test, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router= express.Router();

router.get('/test',test)
router.put('/update/:userId', verifyToken,updateUser)
router.delete('/delete/:userId', verifyToken,deletUser)
router.post('/signout',signOut)


export default router;