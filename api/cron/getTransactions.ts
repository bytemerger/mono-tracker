import 'dotenv/config';
import cron from 'node-cron';
import { refreshTransactions } from '../app/services/userService';
import setupDb from '../config';

setupDb();

cron.schedule('0 */3 * * *', async () => {
    console.log('get Transactions cron triggered');
    refreshTransactions();
});
/* cron.schedule("* * * * *", async () => {
    console.log("get Transactions cron triggered");
    refreshTransactions();
  }); */
