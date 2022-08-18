import express from 'express';
import { createAuthor, getAuthorById, updateAuthor, getAuthors } from '../controllers/userController';
import { isAuthorized, isUser } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/authors', getAuthors);
router.get('/authors/:id', getAuthorById);
router.post('/authors', createAuthor);
router.put('/authors/:id', [isAuthorized, isUser], updateAuthor);
// router.delete('/authors/:id', deleteAuthor);

export default router;
