var CronJob = require('cron').CronJob;
var process=require("child_process");

new CronJob('0 37 * * * *', function() {
   process.fork("./client.js");
}, null, true, 'Asia/Shanghai');