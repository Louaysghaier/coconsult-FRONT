//import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MonprofilComponent } from './monprofil/monprofil.component';
import { SettingsComponent } from './settings/settings.component';
import { SolutionComponent } from './solution/solution.component';
import { VerticalNavBarComponent } from './vertical-nav-bar/vertical-nav-bar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { CardComponent } from './solution/card/card.component';
import { SalaryComponent } from './salary/salary.component';
import { DisplaySalariesComponent } from './salary/display-salaries.component';
import { CongeCalendarComponent } from './conge/conge-calendar.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './users/user-profile.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationManagerComponent } from './evaluation/evaluation.manager.component';
import { CameraComponent } from './pointage/camera.component';
const dashboardRoutes: Routes = [
  
 { path: 'user_dashboard',
  component: DashboardComponent,
  children: [
    {path:'monprofil',component:MonprofilComponent},
    {path:'header', component:HeaderComponent},
    { path: 'vertical-nav-bar', component: VerticalNavBarComponent },
    {path: 'settings',component:SettingsComponent},
    {path:'solutions', component:SolutionComponent},
    { path: 'salary', component: SalaryComponent },
    { path: 'Conge', component: CongeCalendarComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserProfileComponent },
    { path: 'evaluation', component: EvaluationComponent },
    { path: 'evaluation-manager', component: EvaluationManagerComponent },
    { path: 'pointage', component: CameraComponent },
   
  ],
  },
  ];
    
  
  
  @NgModule({
    declarations: [
      HeaderComponent,
      DashboardComponent,
      SettingsComponent,
      SolutionComponent,
      VerticalNavBarComponent,
      MonprofilComponent,
      CardComponent,
      UserProfileComponent
    ],
    imports: [
      
    RouterModule.forChild(dashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
      CommonModule,
      FontAwesomeModule,
      // Import other modules you need

      // Configure child routes
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [],
    exports: [RouterModule]
  })
  export class DashboardModule { }
  