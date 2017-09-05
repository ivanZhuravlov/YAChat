import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from './user.service';

import 'zone.js';
import 'reflect-metadata';

@Component({
  selector: 'login',
  templateUrl: `login.component.html`,
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent 
{ 
  username = '';

  constructor(
    private router: Router,
    private userService: UserService) {
  } 

  onLogin() {
    this.userService.username = this.username;
    this.router.navigate(['/chat']);
  }
}