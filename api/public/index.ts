import express, { ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../app/routes';
import dbConnect from '../config';
import { errorHandler } from '../config/error';

dbConnect();

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Mono-test api Health Check' });
});
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route does not exist' });
});
app.use(errorHandler);
app.listen(3001, () => {
    console.log('server started');
});
