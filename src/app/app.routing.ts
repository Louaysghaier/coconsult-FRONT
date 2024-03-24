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
import { CandidatComponent } from './candidat/candidat.component';
import { QuestionComponent } from './question/question.component';
import { MyquizComponent } from './myquiz/myquiz.component';
import { AffichagequestionComponent } from './affichagequestion/affichagequestion.component';
import { JobOpportComponent } from './job-opport/job-opport.component';
import { CandidatemailComponent } from './candidatemail/candidatemail.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

const routes: Routes = [
  {
    path: '',
    
      loadChildren: () => import('./admin/admin-layout.module').then(m => m.AdminLayoutModule),

  }, 
 
  
  {
    path: '',
    loadChildren: () => import('./user_dashboard/dashboard.module').then(m => m.DashboardModule),

  }, 
  { path:'myquiz',component:MyquizComponent },
  { path: 'Affichagequestion/:quizId/:mailcandidat', component: AffichagequestionComponent },

  { path: 'signin', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'signupentrprise', component: SignupEntrpriseComponent },
  { path: 'verification', component: ValidationComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'ajoutq', component: QuestionComponent },
  { path: 'job', component: JobOpportComponent },
  { path: 'email', component: CandidatemailComponent },
  { path: 'reclamation', component: ReclamationComponent },
 
  




{ path:'candidature',component:CandidatComponent },
 { path: '**', redirectTo: '',component: LandingComponent}

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
