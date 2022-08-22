import express from 'express';
import { getAccountTransactions } from '../controllers/accountController';
import { isAuthenticated, isUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:id/transactions', [isAuthenticated], getAccountTransactions);

export default router;
