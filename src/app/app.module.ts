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
import { CandidatComponent } from './candidat/candidat.component';
import { AffichagequestionComponent } from './affichagequestion/affichagequestion.component';

import { MyquizComponent } from './myquiz/myquiz.component';
import { MatDialogModule } from '@angular/material/dialog';
import { JobOpportComponent } from './job-opport/job-opport.component';
import { CandidatemailComponent } from './candidatemail/candidatemail.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { TESTComponent } from './test/test.component';
import { NavbardorraComponent } from './navbardorra/navbardorra.component';
import { ProfileComponent } from './profile/profile.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ChatComponent } from './chat/chat.component';
import { DashboardModule } from './user_dashboardRH_d/dashboard.module';

import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { LoginforgetpasswordComponent } from './loginforgetpassword/loginforgetpassword.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DashboardModule } from './user_dashboard/dashboard.module';
const config: SocketIoConfig = { url: 'ws://localhost:8082/ws', options: {} };
// social login
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  //FacebookLoginProvider,
  // AmazonLoginProvider,
} from '@abacritt/angularx-social-login';

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
TESTComponent,

    AboutDirective,
    MyquizComponent,
    JobOpportComponent,
    CandidatemailComponent,
    ReclamationComponent,
  
    NavbardorraComponent,
    ProfileComponent,
    ChatComponent,



  
    
    ForgetpassComponent,
    LoginforgetpasswordComponent,
    ChatRoomComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [SocialLoginModule,

    ReactiveFormsModule,
    NgxCaptchaModule,
    RecaptchaModule,
    RecaptchaFormsModule,
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
    MatStepperModule,
    ReactiveFormsModule,
   
    

  ],
  exports: [CandidatemailComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    CarouselModule.forRoot(),
    FontAwesomeModule,
    AdminLayoutModule,
   DashboardModule,
    DashboardModuleCRM,


  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '949795246115-prildq4d724cv6tr1a3tc441c1n8csct.apps.googleusercontent.com'
          ),
        }
      ], onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },
  {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptcha.siteKey,
      size: 'normal'
    } as RecaptchaSettings,
  },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }