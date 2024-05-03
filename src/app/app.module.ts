import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { DashboardModuleCRM } from './user_dashboard_CRM/dashboardCRM.module';
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
import { MAT_DATE_LOCALE } from '@angular/material/core';

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
    AboutDirective,
    
    
  
    
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
    
    CarouselModule.forRoot(),
    FontAwesomeModule,
    AdminLayoutModule,
    DashboardModuleCRM
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' } ,

  

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }