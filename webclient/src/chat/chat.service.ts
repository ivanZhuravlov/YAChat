import { Injectable } from '@angular/core';

import { UserService } from '../user.service';

import '../../node_modules/socket.io-client/dist/socket.io.js';

import { Chat } from './chat';

declare let window: any;

@Injectable()
export class ChatService {
    static serverPort: number = 81;

    static serverAddress: string = `http://192.168.99.100:${ChatService.serverPort}`;
    // static serverAddress: string = `http://localhost:${ChatService.serverPort}`;

    private chatSocket: any;

    private chat: Chat;

    private io: any;

    constructor(private userService: UserService) {
        this.io = window.io;
        this.activate();
    }

    public activate(): void {
        this.chatSocket =
            this.io(`${ChatService.serverAddress}/chat`,
            {
                reconnection: true,
                reconnectionDelay: 1000
            });
        
        this.chat = this.getChat();     
    }

    public getChat(): Chat {
        return this.chat || new Chat(this.chatSocket, this.userService.username);
    }
}
