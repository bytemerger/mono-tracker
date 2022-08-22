import express from 'express';
import user from './user';
import auth from './auth';
import webHook from './webhook';
import transaction from './transaction';
const router = express.Router();

router.use('/users/', user);
router.use(auth);
router.use('/webhooks', webHook);
router.use('/accounts', transaction);

export default router;
