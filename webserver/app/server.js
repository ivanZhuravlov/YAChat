'use strict';

console.log('Server started!');

let App = require('./app');
let ChatProtocol = require('./dao/chatprotocol');
let config = require('./config');
let argv = require('yargs')
    .usage('Usage: $0 --port=[num] --redis=[num] --redisaddress=[string] --withoutmessagebus=[boolean]')
    .alias('p', 'port')
    .default({
        port: 81,
        redisport: 6379,
        redisaddress: config.redisaddress,
        withoutmessagebus: false
    })
    .argv;

let chatProtocolDao = new ChatProtocol();
chatProtocolDao
    .getClient()
    .then((db) => chatProtocolDao.createChatCollection(db));

let app = new App(argv);
app.configure();
app.start();

// http://stackoverflow.com/questions/6958780/quitting-node-js-gracefully
process.on('SIGINT', () => {
    console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
    console.log('Server stopped!');

    process.exit();
})