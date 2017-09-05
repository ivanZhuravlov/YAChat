let _ = require('lodash'),
    ChatProtocol = require('./dao/chatprotocol');

class Chat {
    constructor(ioServer) {
        this.io = ioServer;
        this.namespace = null;
        this.userRegister = [];
    }

    getCurrentUserFromRegistry(userid) {
        return _.find(this.userRegister, (x) => x.userid === userid);
    }

    start() {
        console.log(`Start chat`);
        let that = this;
        this.namespace = this.io.of('/chat');
        this.namespace.on(
            'connect',
            function clientConnected(socket) {
                let currentRoomName = '#root';
                socket.join(currentRoomName);

                console.log(`The client ${socket.id} connected and joined room ${currentRoomName}`);
                socket.emit('client:getuserid', { socketid: socket.id });

                socket.broadcast.to(currentRoomName).emit('server:receivemsg', {
                    username: 'Server',
                    userid: 'Server',
                    msg: `Client ${socket.id} joined the chat in room ${currentRoomName}.`
                });

                socket.on('client:register',
                    function receivedClientRegister(username) {
                        console.log(`User ${username} registered!`);
                        that.userRegister.push({ username: username, userid: socket.id });
                        socket.emit('server:registered');
                    });

                socket.on('client:sendmsg',
                    function receivedClientMsg(msg) {
                        console.log(`${socket.id}: ${msg}`);
                        let currentUserName = that.getCurrentUserFromRegistry(socket.id).username;
                        let chatEntry = { msg: msg, userid: socket.id, username: currentUserName };
                        socket.broadcast.to(currentRoomName).emit('server:receivemsg', chatEntry);
                        let chatProtocolDao = new ChatProtocol();
                        chatProtocolDao.getClient()
                            .then((db) => {
                                console.log('Insering Message')
                                chatProtocolDao.insert(db, chatEntry)
                                    .then(() => {
                                        console.log('Insert successful.');
                                        db.close()
                                    })
                                    .catch(err => {
                                        console.log('Error occured while inserting');
                                        console.log(err);
                                        db.close()
                                    });
                            })
                            .catch(err => console.log(err));
                    });

                socket.on('client:getallmsg',
                    function receivedGetAllMsg() {
                        console.log(`Querying all messages from ${socket.id}`);
                        let chatProtocolDao = new ChatProtocol();
                        chatProtocolDao.getClient()
                            .then((db) => {
                                chatProtocolDao.getAll(db)
                                    .then((data) => {
                                        console.log(`Send all messages to ${socket.id}`)
                                        socket.emit('server:gotallmsg', data);
                                        db.close();
                                    })
                                    .catch(err => {
                                        console.log(`Error occured while getting all messages.`)
                                        console.log(err);
                                        db.close()
                                    });
                            })
                            .catch(err => console.log(err));
                    })

                socket.on('client:joinroom',
                    function requestRoomJoining(data) {
                        console.log(`${socket.id}: Leaving room ${currentRoomName}`);
                        socket.emit(
                            'server:receivemsg', {
                                username: 'Server',
                                userid: 'Server',
                                msg: `You left the room ${currentRoomName}.`
                            });
                        socket.broadcast.to(currentRoomName).emit(
                            'server:receivemsg', {
                                username: 'Server',
                                userid: 'Server',
                                msg: `Client ${that.getCurrentUserFromRegistry(socket.id).username} [${socket.id}] left the room ${currentRoomName}.`
                            });
                        socket.leave(currentRoomName);

                        currentRoomName = data.room;
                        console.log(`${socket.id}: Joining room ${currentRoomName}`);
                        socket.join(currentRoomName);
                        socket.emit(
                            'server:receivemsg', {
                                username: 'Server',
                                userid: 'Server',
                                msg: `You joined the room ${currentRoomName}.`
                            });
                        socket.broadcast.to(currentRoomName).emit(
                            'server:receivemsg', {
                                username: 'Server',
                                userid: 'Server',
                                msg: `Client ${that.getCurrentUserFromRegistry(socket.id).username} [${socket.id}] joined the room ${currentRoomName}.`
                            });
                    });

                socket.on('disconnect',
                    function clientDisconnected() {
                        console.log(`The client ${socket.id} disconnected from chat.`);
                        socket.broadcast.to(currentRoomName).emit(
                            'server:receivemsg', {
                                username: 'Server',
                                userid: 'Server',
                                msg: `Client ${that.getCurrentUserFromRegistry(socket.id).username} [${socket.id}] left the chat.`
                            });

                        _.remove(that.userRegister, (x) => x.userid === socket.id)
                    });
            });
    }
}

module.exports = Chat;