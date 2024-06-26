import express from 'express';
import { deleteUser, signOut, test, updateUser ,getUsers, getUser} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router= express.Router();

router.get('/test',test)
router.put('/update/:userId', verifyToken,updateUser)
router.delete('/delete/:userId', verifyToken,deleteUser)
router.post('/signout',signOut)
router.get('/getUsers',verifyToken,getUsers)
router.get('/:userId',getUser)


export default router;