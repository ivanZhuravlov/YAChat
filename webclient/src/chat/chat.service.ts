import { Injectable } from '@angular/core';

import { UserService } from '../user.service';

import '../../node_modules/socket.io-client/dist/socket.io.js';

import { Chat } from './chat';

import { config } from '../config';

declare let window: any;

@Injectable()
export class ChatService {
    static serverAddress: string = config.serverAddress;

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
