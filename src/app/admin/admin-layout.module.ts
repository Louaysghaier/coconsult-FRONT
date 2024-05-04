import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './admindashboard/admindashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { NavbarComponent } from './adminnavbar/adminnavbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { CardGPCHATComponent } from './card-gpchat/card-gpchat.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './group-chat/update-dialog/update-dialog.component';
import { NotifDialogComponent } from './notifications/notif-dialog/notif-dialog.component';
const AdminLayoutRoutes: Routes = [
  {path:'admin',
component:AdminLayoutComponent,
children: [
   { path: 'admindashboard',      component: DashboardComponent },
   { path: 'user-profile',   component: UserProfileComponent },
   { path: 'table-list',     component: TableListComponent },
   { path: 'notifications',  component: NotificationsComponent },
   { path: 'navbar',  component: NavbarComponent },
   { path: 'sidenavbar',  component: SidebarComponent },
   { path: 'ChatRooms',  component: GroupChatComponent },

]},
  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,

  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
    GroupChatComponent,
    CardGPCHATComponent,
    UpdateDialogComponent,
    NotifDialogComponent,

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

    providers: [],
    exports: [RouterModule]

})

export class AdminLayoutModule {}
