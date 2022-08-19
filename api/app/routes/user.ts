import express from 'express';
import {
    createUser,
    getUserById,
    addUserAccount,
    getUserAccounts,
    removeUserAccount,
} from '../controllers/userController';
import { isAuthenticated, isUser } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.get('/:id/accounts', [isAuthenticated, isUser], getUserAccounts);
router.put('/:id/accounts', [isAuthenticated, isUser], addUserAccount);
router.delete('/:id/accounts', [isAuthenticated, isUser], removeUserAccount);
// router.delete('/users/:id', deleteUser);

export default router;
