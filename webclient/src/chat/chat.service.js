"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("../../node_modules/socket.io-client/dist/socket.io.js");
var chat_1 = require("./chat");
var ChatService = /** @class */ (function () {
    function ChatService() {
        this.io = window.io;
        this.activate();
    }
    ChatService_1 = ChatService;
    ChatService.prototype.activate = function () {
        this.chatSocket =
            this.io(ChatService_1.serverAddress + "/chat", {
                reconnection: true,
                reconnectionDelay: 1000
            });
        this.chat = this.getChat();
    };
    ChatService.prototype.getChat = function () {
        return this.chat || new chat_1.Chat(this.chatSocket);
    };
    ChatService.serverPort = 81;
    // static serverAddress: string = `http://192.168.99.100:${ChatService.serverPort}`;
    ChatService.serverAddress = "http://localhost:" + ChatService_1.serverPort;
    ChatService = ChatService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ChatService);
    return ChatService;
    var ChatService_1;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map