import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'chat',
  templateUrl: `chat.component.html`,
  styleUrls: [ 'chat.component.css' ]
})
export class ChatComponent 
{ 
  title = 'Chat'; 
}