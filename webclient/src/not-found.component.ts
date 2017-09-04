import { Component } from '@angular/core';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'not-found',
  templateUrl: `not-found.component.html`,
  styleUrls: [ 'not-found.component.css' ]
})
export class NotFoundComponent 
{ 
  title = 'Page not found!'; 
}