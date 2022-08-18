import express from 'express';
import { createUser, getUserById, addUserAccount, getUserAccounts } from '../controllers/userController';
import { isAuthenticated, isUser } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.get('/:id/accounts', [isAuthenticated, isUser], getUserAccounts);
router.put('/:id/accounts', [isAuthenticated, isUser], addUserAccount);
// router.delete('/users/:id', deleteUser);

export default router;
