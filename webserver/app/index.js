'use strict';

console.log('Server started!');

let Server = require('./server');
let argv = require('yargs')
  .usage('Usage: $0 --port=[num] --redis=[num] --redisaddress=[string] --useMessageBus=[boolean]')
  .alias('p', 'port')
  .default({
    port: 81,
    redisport: 6379,
    redisaddress: 'yachat_messagebus_1',
    usemessagebus: true
  })
  .argv;

let server = new Server(argv);
server.configure();
server.start();

// http://stackoverflow.com/questions/6958780/quitting-node-js-gracefully
process.on('SIGINT', () => {
  console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
  console.log('Server stopped!');

  process.exit();
})
