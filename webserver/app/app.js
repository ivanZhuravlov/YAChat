let _ = require('lodash'),
    redis = require('socket.io-redis'),
    SockerIoServer = require('socket.io'),
    Chat = require('./chat'),
    Mail = require('./mail');

class App {
    constructor(config) {
        this.port = config.port;
        this.redisport = config.redisport;
        this.redisaddress = config.redisaddress;
        this.withoutmessagebus = config.withoutmessagebus;

        this.io = null;
        this.namespaces = []
    }

    configure() {
        this.io = new SockerIoServer(this.port);

        if (!this.withoutmessagebus) {
            this.io.adapter(redis({ host: this.redisaddress, port: this.redisport }))
        }
        
        this.io.origins('*:*');
    }

    start() {
        console.log(`Listening on *:${this.port}`);
        this.namespaces.push(new Chat(this.io));
        this.namespaces.push(new Mail(this.io));
        
        _.forEach(this.namespaces, (item) => {
            item.start();
        });
    }
}

module.exports = App;



