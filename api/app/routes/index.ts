import express from 'express';
import author from './author';
import auth from './authRoutes';
const router = express.Router();

router.use(author);
router.use(auth);

export default router;
