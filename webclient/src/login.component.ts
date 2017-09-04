import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'login',
  templateUrl: `login.component.html`,
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent 
{ 
  title = 'Login'; 
}