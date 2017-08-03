import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'my-app',
  templateUrl: `app.component.html`,
  styleUrls: ['app.component.css']
})
export class AppComponent 
{ 
  name = 'Angular'; 
}