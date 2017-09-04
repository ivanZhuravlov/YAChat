import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'chat-messages',
  templateUrl: `chat-messages.component.html`,
  styleUrls: ['chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  constructor(
    public chatService: ChatService
  ) {
  }

  ngOnInit() {
  }
}