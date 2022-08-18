import express from 'express';
import user from './user';
import auth from './auth';
const router = express.Router();

router.use('/users/', user);
router.use(auth);

export default router;
