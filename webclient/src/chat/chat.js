"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Chat = /** @class */ (function () {
    function Chat(chatSocket) {
        this.chatSocketConnectionState = new BehaviorSubject_1.BehaviorSubject('disconnected');
        this.messages = [];
        this.currentUserId = 'Client without UserID';
        this.chatSocket = chatSocket;
        this.activate();
    }
    Chat.prototype.activate = function () {
        // this.chatSocket.on('connect', () => this.socketConnected$.next(true));
        // this.chatSocket.on('disconnect', () => this.socketConnected$.next(false));
        var _this = this;
        var that = this;
        this.chatSocket.on('connect', function () {
            that.messages.push({ msg: 'You are connected to the chat!', userid: 'Server' });
            that.chatSocketConnectionState.next('connected');
        });
        this.chatSocket.on('disconnect', function () {
            that.messages.push({ msg: 'Server disconnected. Trying to reconnect...', userid: 'Server' });
            that.chatSocketConnectionState.next('disconnected');
        });
        this.chatSocket.on('reconnect', function () {
            that.messages.push({ msg: 'You are reconnected to the chat', userid: 'Server' });
            that.chatSocketConnectionState.next('reconnected');
        });
        this.chatSocket.on('client:getuserid', function (data) {
            that.currentUserId = data.socketid;
            that.messages.push({ msg: "You've got the client id " + that.currentUserId + "!", userid: 'Server' });
        });
        this.receiveMessageStream = this.listen('server:receivemsg');
        this.receiveMessageSubscription = this.receiveMessageStream.subscribe(function (data) { return _this.messages.push({
            msg: data.msg,
            userid: data.userid
        }); });
    };
    Chat.prototype.getCurrentUserId = function () {
        return this.currentUserId;
    };
    Chat.prototype.send = function (msg) {
        if (msg.length) {
            this.chatSocket.emit('client:sendmsg', msg);
            this.messages.push({ msg: msg, userid: this.currentUserId });
        }
    };
    Chat.prototype.listen = function (event) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            _this.chatSocket.on(event, function (data) {
                observer.next(data);
            });
            // observable is disposed
            return function () {
                _this.chatSocket.off(event);
            };
        });
    };
    return Chat;
}());
exports.Chat = Chat;
//# sourceMappingURL=chat.js.map