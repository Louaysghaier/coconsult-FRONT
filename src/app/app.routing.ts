import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupEntrpriseComponent } from './signupentreprise/signupentreprise.component';
import { ValidationComponent } from './validation/validation.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { ContactComponent } from './shared/contact/contact.component';
const routes: Routes = [
  {
    path: '',
    
      loadChildren: () => import('./admin/admin-layout.module').then(m => m.AdminLayoutModule),

  }, 
 
  
  {
    path: '',
    loadChildren: () => import('./user_dashboard_CRM/dashboardCRM.module').then(m => m.DashboardModuleCRM),
    
  }, 
  
  { path: 'signin', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'signupentrprise', component: SignupEntrpriseComponent },
  { path: 'verification', component: ValidationComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
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
  exports: [RouterModule], // Export RouterModule for use in other modules
})
export class AppRoutingModule {}
