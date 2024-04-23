import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admindashboard/admindashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NavbarComponent } from './adminnavbar/adminnavbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { CardGPCHATComponent } from './card-gpchat/card-gpchat.component';
import { UpdateDialogComponent } from './group-chat/update-dialog/update-dialog.component';
import { ExpansesComponent } from './expanses/expanses.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjFeedComponent } from './proj-feed/proj-feed.component';
import { QuoteComponent } from './quote/quote.component';
import { TimeRecordComponent } from './time-record/time-record.component';
import { AssignmentsComponent } from './assignement/assignement.component';
import { Assignements } from '../_models/assignements';

const AdminLayoutRoutes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: 'admindashboard', component: DashboardComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'table-list', component: TableListComponent },
            { path: 'notifications', component: NotificationsComponent },
            { path: 'navbar', component: NavbarComponent },
            { path: 'sidenavbar', component: SidebarComponent },
            { path: 'ChatRooms', component: GroupChatComponent },
            { path: 'assignement', component: AssignmentsComponent },
            { path: 'expanses', component: ExpansesComponent },
            { path: 'proj-feed', component: ProjFeedComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'time-record', component: TimeRecordComponent },
            { path: 'quote', component: QuoteComponent },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTooltipModule,
        MatDialogModule,
        MatPaginatorModule,
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
        AssignmentsComponent,
        ExpansesComponent,
        ProjectsComponent,
        ProjFeedComponent,
        QuoteComponent,
        TimeRecordComponent,
    ],
    exports: [RouterModule],
})
export class AdminLayoutModule {}
