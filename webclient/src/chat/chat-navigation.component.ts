import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'chat-navigation',
  templateUrl: `chat-navigation.component.html`,
  styleUrls: [ 'chat-navigation.component.css' ]
})
export class ChatNavigationComponent 
{ 
  title = 'ChatNavigation'; 
}