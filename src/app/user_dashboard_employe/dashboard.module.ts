//import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MonprofilComponent } from './monprofil/monprofil.component';
import { VerticalNavBarComponent } from './vertical-nav-bar/vertical-nav-bar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { CandidatresultComponent } from './candidatresult/candidatresult.component';
import { SettingsComponent } from './settings/settings.component';
import { DetailNotifDiagComponent } from './header/detail-notif-diag/detail-notif-diag.component';
import { CardComponent } from './solution/card/card.component';
<<<<<<<< HEAD:src/app/user_dashboardRH_d/DashboardModuleRHd.module.ts


const dashboardRoutes: Routes = [
    { path: 'user_dashboardRH_d',
        component: DashboardComponent,
        children: [
            {path:'monprofil',component:MonprofilComponent},
            {path:'header', component:HeaderComponent},
            { path: 'vertical-nav-bar', component: VerticalNavBarComponent },
            {path: 'settings',component:SettingsComponent},
            {path:'result', component:CandidatresultComponent}
========
import { MatDialog } from '@angular/material/dialog';
import { TicketlistuComponent } from './ticketlistu/ticketlistu.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MeetinfRoomComponent } from './meetinf-room/meetinf-room.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { ActivityuseComponent } from './activityuse/activityuse.component';



const dashboardRoutes: Routes = [
 { path: 'user_dashboard_employe',
  component: DashboardComponent,
  children: [
    {path:'monprofil',component:MonprofilComponent},
    {path:'header', component:HeaderComponent},
    {path: 'vertical-nav-bar', component: VerticalNavBarComponent },
    {path: 'settings',component:SettingsComponent},
    {path:'solutions', component:SolutionComponent},
    {path:'ticketlist', component:TicketlistuComponent},
    {path:'MeetRoom', component:MeetinfRoomComponent},
    {path:'MeetingsListe', component:MeetingsComponent},
    { path: 'meeting/:meetingId', component: MeetinfRoomComponent },
    { path: 'Activityuse', component: ActivityuseComponent },
>>>>>>>> origin/achref:src/app/user_dashboard_employe/dashboard.module.ts




<<<<<<<< HEAD:src/app/user_dashboardRH_d/DashboardModuleRHd.module.ts
        ],
    },
];



@NgModule({
    declarations: [
        HeaderComponent,
        DashboardComponent,
        SettingsComponent,
        CardComponent,
        VerticalNavBarComponent,
        MonprofilComponent,
        CandidatresultComponent,


        DetailNotifDiagComponent,
    ],
    imports: [
========



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
      TicketlistuComponent,
      MeetinfRoomComponent,
      MeetingsComponent,
      ActivityuseComponent,
      
     
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
    MatPaginatorModule,

    
    
    
      
      // Import other modules you need
>>>>>>>> origin/achref:src/app/user_dashboard_employe/dashboard.module.ts

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
export class DashboardModuleRHd { }
  
