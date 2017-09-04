import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'chat-actionbar',
  templateUrl: `chat-actionbar.component.html`,
  styleUrls: [ 'chat-actionbar.component.css' ]
})
export class ChatActionbarComponent 
{ 
  title = 'ChatActionbar'; 
}