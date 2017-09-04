import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'mail',
  templateUrl: `mail.component.html`,
  styleUrls: [ 'mail.component.css' ]
})
export class MailComponent 
{ 
  title = 'Mail'; 
}