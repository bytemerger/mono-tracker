import express from 'express';
import { processWebhook } from '../controllers/webHookController';

const router = express.Router();

router.post('/mono', processWebhook);

export default router;
