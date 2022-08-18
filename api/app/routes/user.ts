import express from 'express';
import { createUser, getUserById, addUserAccount, } from '../controllers/userController';
import { isAuthenticated, isUser } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id/accounts', [isAuthenticated, isUser], addUserAccount);
// router.delete('/users/:id', deleteUser);

export default router;
