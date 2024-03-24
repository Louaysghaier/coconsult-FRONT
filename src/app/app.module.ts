import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DashboardModule } from './user_dashboard/dashboard.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminLayoutModule } from './admin/admin-layout.module';
import { SignupEntrpriseComponent } from './signupentreprise/signupentreprise.component';
import { AppRoutingModule } from './app.routing';
import { ValidationComponent } from './validation/validation.component';
import { NgOtpInputModule } from 'ng-otp-input';


import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { ContactComponent } from './shared/contact/contact.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutDirective } from './shared/aboutus/about.directive';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { CandidatComponent } from './candidat/candidat.component';
import { AffichagequestionComponent } from './affichagequestion/affichagequestion.component';
import { QuestionComponent } from './question/question.component';
import { MyquizComponent } from './myquiz/myquiz.component';
import { MatDialogModule } from '@angular/material/dialog';
import { JobOpportComponent } from './job-opport/job-opport.component';
import { CandidatemailComponent } from './candidatemail/candidatemail.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupEntrpriseComponent,
    SignupComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ValidationComponent,
    AboutusComponent,
    ContactComponent,
CandidatComponent,
AffichagequestionComponent,

QuestionComponent,
    AboutDirective,
    MyquizComponent,
    JobOpportComponent,
    CandidatemailComponent,
    ReclamationComponent,

  
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    NgOtpInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    CarouselModule.forRoot(),
    FontAwesomeModule,
    DashboardModule,
    ReactiveFormsModule,
   
    

  ],
  exports: [CandidatemailComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
