import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'chat-messages',
  templateUrl: `chat-messages.component.html`,
  styleUrls: [ 'chat-messages.component.css' ]
})
export class ChatMessagesComponent 
{ 
  title = 'ChatMessages'; 
}