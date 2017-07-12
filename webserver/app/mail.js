let _ = require('lodash');

class Mail {
    constructor(ioServer) {
        this.io = ioServer;
        this.namespace = null;
    }

    start() {
        console.log(`Start mail`);
        this.namespace = this.io.of('/mail');
        this.namespace.on(
            'connect',
            function clientConnected(socket) {
                console.log(`The client ${socket.id} connected to the mail server.`);

                let sendMailTimer = setInterval(() =>  {
                socket.emit('server:receivemail', {
                    head: `Sending an E-Mail to ${socket.id}`,
                    body: `Message with an UID: ${_.uniqueId()}`
                });
                console.log(`Send mail to client ${socket.id}.`);
                }, 10000);

                socket.on('disconnect',
                function clientDisconnected() {
                    console.log(`The client ${socket.id} disconnected from mail server.`);
                    clearInterval(sendMailTimer);
                });
            });
    }
}

module.exports = Mail;