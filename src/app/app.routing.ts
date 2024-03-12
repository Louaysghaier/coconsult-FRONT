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
const routes: Routes = [
  {
    path: '',
    
      loadChildren: () => import('./admin/admin-layout.module').then(m => m.AdminLayoutModule)

  }, 
 
  
  {
    path: '',
    loadChildren: () => import('./user_dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[ AuthGuard]

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
