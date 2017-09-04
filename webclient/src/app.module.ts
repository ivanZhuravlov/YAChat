import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { LoginComponent } from './login.component';
import { ChatComponent } from './chat.component';
import { MailComponent } from './mail.component';
import { NotFoundComponent } from './not-found.component';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports:      [ BrowserModule, RouterModule, AppRoutingModule ],
  declarations: [ AppComponent, LoginComponent, ChatComponent, MailComponent, NotFoundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
