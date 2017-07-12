class Chat {
    constructor(ioServer) {
        this.io = ioServer;
        this.namespace = null;
    }

    start() {
        console.log(`Start chat`);
        this.namespace = this.io.of('/chat');
        this.namespace.on(
            'connect',
            function clientConnected(socket) {
                let currentRoomName = '#root';
                socket.join(currentRoomName);

                console.log(`The client ${socket.id} connected and joined room ${currentRoomName}`);
                socket.emit('client:getuserid', { socketid: socket.id });

                socket.broadcast.to(currentRoomName).emit('server:receivemsg',
                {
                    userid: 'Server',
                    msg: `Client ${socket.id} joined the chat in room ${currentRoomName}.`
                });

                socket.on('client:sendmsg',
                function receivedClientMsg(msg) {
                    console.log(`${socket.id}: ${msg}`);
                    socket.broadcast.to(currentRoomName).emit('server:receivemsg', { msg: msg, userid: socket.id });
                });

                socket.on('client:joinroom',
                function requestRoomJoining(data) {
                    console.log(`${socket.id}: Leaving room ${currentRoomName}`);
                    socket.emit(
                    'server:receivemsg',
                    {
                        userid: 'Server',
                        msg: `You left the room ${currentRoomName}.`
                    });
                    socket.broadcast.to(currentRoomName).emit(
                    'server:receivemsg',
                    {
                        userid: 'Server',
                        msg: `Client ${socket.id} left the room ${currentRoomName}.`
                    });
                    socket.leave(currentRoomName);

                    currentRoomName = data.room;
                    console.log(`${socket.id}: Joining room ${currentRoomName}`);
                    socket.join(currentRoomName);
                    socket.emit(
                    'server:receivemsg',
                    {
                        userid: 'Server',
                        msg: `You joined the room ${currentRoomName}.`
                    });
                    socket.broadcast.to(currentRoomName).emit(
                    'server:receivemsg',
                    {
                        userid: 'Server',
                        msg: `Client ${socket.id} joined the room ${currentRoomName}.`
                    });
                });

                socket.on('disconnect',
                function clientDisconnected() {
                    console.log(`The client ${socket.id} disconnected from chat.`);
                    socket.broadcast.to(currentRoomName).emit(
                    'server:receivemsg',
                    {
                        userid: 'Server',
                        msg: `Client ${socket.id} left the chat.`
                    });
                });
            });
    }
}

module.exports = Chat;