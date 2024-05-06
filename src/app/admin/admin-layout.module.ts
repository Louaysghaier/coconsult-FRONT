import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admindashboard/admindashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './adminnavbar/adminnavbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivityComponent } from './activity/activity.component';
import { AddactivityComponent } from './addactivity/addactivity.component';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TicketlistComponent } from './ticketlist/ticketlist.component';
import { AddTicketlistComponent } from './addticketlist/addticketlist.component';
import { EditticketlistComponent } from './editticketlist/editticketlist.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { MeetingComponent } from './meeting/meeting.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { TeamComponent } from './team/team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { MatStepperModule } from '@angular/material/stepper';
import { RoomComponent } from './room/room.component';
import { HomemeetComponent } from './homemeet/homemeet.component';
import { MeetingAffectuserComponent } from './meeting-affectuser/meeting-affectuser.component';
import { RoomConfigurationComponent } from './room-configuration/room-configuration.component';
import { ListesUsersMeetComponent } from './listes-users-meet/listes-users-meet.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { AffecterUserAteamComponent } from './affecter-user-ateam/affecter-user-ateam.component';


const AdminLayoutRoutes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'admindashboard', component: DashboardComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'table-list', component: TableListComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'addactivity', component: AddactivityComponent },
      { path: 'edit/:id', component: EditActivityComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'sidenavbar', component: SidebarComponent },
      { path: 'ticketlist', component: TicketlistComponent },
      { path: 'addticketlist', component: AddTicketlistComponent }, 
      { path: 'Meeting', component: MeetingComponent },
      { path: 'Team', component: TeamComponent },
      { path: 'room', component: RoomComponent },
      { path: 'homemeet', component: HomemeetComponent },
      { path: 'useraffecttomeet', component: MeetingAffectuserComponent },
      { path: 'RoomConfiguration', component: RoomConfigurationComponent },







      
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(AdminLayoutRoutes),
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, 
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatStepperModule,

  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
    ActivityComponent,
    AddactivityComponent,
    EditActivityComponent,
    TicketlistComponent,
    AddTicketlistComponent,
    EditticketlistComponent,
    TicketdetailsComponent,
    MeetingComponent,
    EditMeetingComponent,
    AddMeetingComponent,
    TeamComponent,
    EditTeamComponent,
    AddTeamComponent,
    RoomComponent,
    HomemeetComponent,
    MeetingAffectuserComponent,
    RoomConfigurationComponent,
    ListesUsersMeetComponent,
    MeetingDetailsComponent,
    AffecterUserAteamComponent,
  ],
  providers: [],
  exports: [RouterModule],
})
export class AdminLayoutModule {}
