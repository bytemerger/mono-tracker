import express from 'express';
import { createUser, getUserById, updateUser, } from '../controllers/userController';
import { isAuthorized, isUser } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', [isAuthorized, isUser], updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
