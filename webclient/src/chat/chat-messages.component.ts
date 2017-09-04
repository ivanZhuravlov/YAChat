import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

import { ChatService } from './chat.service';

import 'zone.js';
import 'reflect-metadata';

@Component({
    selector: 'chat-messages',
    templateUrl: `chat-messages.component.html`,
    styleUrls: ['chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, AfterViewChecked {

    @ViewChild('chatMessages')
    private chatMessagesElementRef: ElementRef;

    constructor(
        public chatService: ChatService
    ) {
    }

    ngOnInit() {
        this.scrollToBottom();
        this.chatService.getChat()
            .receiveMessageStream
            .subscribe((data) => this.scrollToBottom());
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.chatMessagesElementRef.nativeElement.scrollTop =
                this.chatMessagesElementRef.nativeElement.scrollHeight;
        } catch (err) { }
    }
}