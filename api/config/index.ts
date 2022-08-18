import mongoose from 'mongoose';
import config from './secret';

function setupDb(): void {
    mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log('connected');
    });
}
export default setupDb;
