import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendar module
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

import dayGridPlugin from '@fullcalendar/daygrid';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { ContactComponent } from './shared/contact/contact.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutDirective } from './shared/aboutus/about.directive';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { LoginforgetpasswordComponent } from './loginforgetpassword/loginforgetpassword.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SalaryComponent } from './user_dashboard/salary/salary.component';
import { DisplaySalariesComponent } from './user_dashboard/salary/display-salaries.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCongeModalComponent } from './user_dashboard/conge/add-conge-modal.component';
import { UsersComponent } from './user_dashboard/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileComponent } from './user_dashboard/users/user-profile.component';
import { EvaluationComponent } from './user_dashboard/evaluation/evaluation.component';
import { EvaluationManagerComponent } from './user_dashboard/evaluation/evaluation.manager.component';
import { CameraComponent } from './user_dashboard/pointage/camera.component';
import { AddAskComponent } from './user_dashboard/demandeConge/add-demande.component';
import { DemandeCongeComponent } from './user_dashboard/demandeConge/table-demande-component';
import { MatIconModule } from '@angular/material/icon';
import { RappelPointageComponent } from './user_dashboard/pointage/rappel.pointage.component';
import { CongeDetailsModalComponent } from './user_dashboard/conge/conge-details-modal.component';
import { AdminListSalaire } from './admin/salaire/admin-list-salaire';

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
    ForgetpassComponent,
    LoginforgetpasswordComponent,
    ChatRoomComponent,
    SalaryComponent,
    AddCongeModalComponent,
    UsersComponent,
    EvaluationComponent,
    EvaluationManagerComponent,
    CameraComponent,
    AddAskComponent,
    DemandeCongeComponent,
    RappelPointageComponent,
    CongeDetailsModalComponent,
    AdminListSalaire
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    ReactiveFormsModule,
    NgxCaptchaModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    
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
    DashboardModule,
    FullCalendarModule,
    MatDialogModule,
    FormsModule ,
    MatTableModule, 
    MatPaginatorModule,
    MatIconModule,

  ],
  providers: [
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
