import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';

import 'zone.js';
import 'reflect-metadata';

@Component({
    selector: 'chat-actionbar',
    templateUrl: `chat-actionbar.component.html`,
    styleUrls: ['chat-actionbar.component.css']
})
export class ChatActionbarComponent implements OnInit {
    currentMessage = '';

    constructor(
        public chatService: ChatService
    ) { }

    send() {
        if (this.currentMessage.length) {

            this.chatService.getChat().send(this.currentMessage);
            this.currentMessage = '';
        }
    }

    ngOnInit() {
    }
}