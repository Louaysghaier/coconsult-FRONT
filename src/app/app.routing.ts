import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupEntrpriseComponent } from './signupentreprise/signupentreprise.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { ValidationComponent } from './validation/validation.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { ContactComponent } from './shared/contact/contact.component';
import { AuthGuard } from './_helpers';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { LoginforgetpasswordComponent } from './loginforgetpassword/loginforgetpassword.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { AddAskComponent } from './user_dashboardRH_w/demandeConge/add-demande.component';
const routes: Routes = [
  {
    path: '',
    
      loadChildren: () => import('./admin/admin-layout.module').then(m => m.AdminLayoutModule)

  }, 
 
  
  {
    path: '',
    loadChildren: () => import('./user_dashboardRH_w/dashboard.module').then(m => m.DashboardModule)

  }, 
  
  { path: 'signin', component: LoginComponent },
  { path: 'register', component: SignupComponent },

  { path: 'signupentrprise', component: SignupEntrpriseComponent },
  { path: 'verification', component: ValidationComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resetpassword', component:     ForgetpassComponent
},

{ path: 'forgetpassword', component: LoginforgetpasswordComponent},
{path:'chatroom',component:ChatRoomComponent },
{ path: '**', redirectTo: '',component: LandingComponent},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule], 
})
export class AppRoutingModule {}
