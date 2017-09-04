import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { LoginComponent } from './login.component';
import { MailComponent } from './mail/mail.component';
import { NotFoundComponent } from './not-found.component';

import { ChatComponent } from './chat/chat.component';
import { ChatActionbarComponent } from './chat/chat-actionbar.component';
import { ChatMessagesComponent } from './chat/chat-messages.component';
import { ChatNavigationComponent } from './chat/chat-navigation.component';
import { ChatService } from './chat/chat.service';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  imports: [ 
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [ 
    AppComponent,
    LoginComponent,
    MailComponent,
    NotFoundComponent,
    ChatComponent,
    ChatActionbarComponent,
    ChatMessagesComponent,
    ChatNavigationComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ ChatService ]
})
export class AppModule { }
