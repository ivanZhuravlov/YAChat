import { NgModule }              from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ChatComponent } from './chat/chat.component';
import { MailComponent } from './mail/mail.component';
import { NotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'mail', component: MailComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}