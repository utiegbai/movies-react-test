const dotenv = require('dotenv');
const fetchShows = require('./tasks/fetchShows');
const CronJob = require('cron').CronJob;

dotenv.config() // Load environment veriables (.env)

fetchShows() // fetch shows immediately worker starts running
new CronJob('0 0 * * *', fetchShows, null, true, 'America/Los_Angeles'); // fetch shows every 24 hours