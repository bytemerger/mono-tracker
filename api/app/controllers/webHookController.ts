import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import config from '../../config/secret';
import { processWebhookData } from '../services/webhookService';

export async function processWebhook(req: Request, res: Response, next: NextFunction) {
    if (req.headers['mono-webhook-secret'] !== config.MONO_WEBHOOK_SECRET) {
        return res.status(401).json({
            message: 'Unauthorized request.',
        });
    }

    try {
        const process = await processWebhookData(req.body);
        if (process) return res.sendStatus(200);
    } catch (error) {
        // use a logger or ... bugsnag to track
        console.log(error);
        return next(createHttpError(500));
    }
}
