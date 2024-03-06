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
import { ActivitySalesTeamComponent } from './activity-sales-team/activity-sales-team.component';
//import { ContractComponent } from './contract/contract.component';
import { ProspectComponent } from './prospect/prospect.component';
import { PayementComponent } from './payement/payement.component';
import { RepertoireComponent } from './repertoire/repertoire.component';
import { ContractComponent } from './contract/contract.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';
const dashboardRoutes: Routes = [
 { path: 'user_dashboard',
  component: DashboardComponent,
  children: [
    {path:'monprofil',component:MonprofilComponent},
    {path:'header', component:HeaderComponent},
    { path: 'vertical-nav-bar', component: VerticalNavBarComponent },
    {path: 'settings',component:SettingsComponent},
    {path:'solutions', component:SolutionComponent},
    {path:'repertoire', component:RepertoireComponent},
    {path:'prospect', component:ProspectComponent},
    {path:'contract', component:ContractComponent},
    {path:'activity-sales-team', component:ActivitySalesTeamComponent},
    {path:'payement', component:PayementComponent},
    


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
      ActivitySalesTeamComponent,
      ContractComponent,
      ProspectComponent,
      PayementComponent,
      RepertoireComponent,
      UpdateContractComponent,
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
  