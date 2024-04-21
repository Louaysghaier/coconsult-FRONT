import { Component, OnInit, ViewChild } from '@angular/core';
 import {User} from 'src/app/admin/table-list/user';

import { ListeUserAscService } from 'src/app/user_dashboard/settings/liste-user-asc.service';
import { AddUpdateActivitySalesTeamComponent } from '../add-update-activity-sales-team/add-update-activity-sales-team.component';
import { SalesActivity } from 'src/app/_models/ActivitySalesTeam';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivitySalesTeamService } from 'src/app/_services/activity-sales-team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
 
  displayedColumns: string[] = ['heureStart', 'heureEnd', 'description', 'typeAct', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user:any[];
  data: SalesActivity;
  activitySalesTeamProspecting: SalesActivity[] = [];
  activitySalesTeamNegotiation: SalesActivity[] = [];
  activitySalesTeamClosing: SalesActivity[] = []; 
  selectedTab: string = '';
  

  constructor( private _dialog: MatDialog, private activityService: ActivitySalesTeamService, private listeUserAscService: ListeUserAscService, private route: ActivatedRoute) {}
 emlpoyesAsc:User[];
 entrepriseAsc:User[];
 role: string;
  ngOnInit(): void {
    //this.getUserAsc();
    this.getUsersByRole();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllSalesActivities(); 
  
    this.route.fragment.subscribe(fragment => {
      this.selectedTab = fragment || 'Prospecting';
      this.loadActivitySalesTeamByClass(this.selectedTab);
    });

  }

  private getUsersByRole() {
    if (this.role === 'ROLE_Entreprise') {
      this.getEntrepriseAsc();
    } else if (this.role === 'ROLE_Employee') {
      this.getEmlpoyesAsc();
    }
  }
  private getEntrepriseAsc(){
    this.listeUserAscService.getUserByRoles('ROLE_Entreprise').subscribe(data => {
      this.emlpoyesAsc = data;
    });
    }
    private getEmlpoyesAsc(){
      this.listeUserAscService.getUserByRoles('ROLE_Employee').subscribe(data => {
      this.entrepriseAsc = data;
      });
      }

  private getUserAsc() {
    this.listeUserAscService.getListUserAsc().subscribe(
      (response: any[]) => {
        console.log('Received data from the API:', response);
        this.user = response; 
      },
      (error) => {
        console.error('Error fetching data from the API:', error);
      }
    );
  }
  
  openAddUpdateActivitySalesTeamForm() {
    const dialogRef = this._dialog.open(AddUpdateActivitySalesTeamComponent);
    dialogRef.afterClosed().subscribe((formData) => {
     if (formData) {
       // Add your logic here to handle the submitted form data
        console.log('Form data submitted:', formData);
      }
    });
  }


  
  openEditForm(data: SalesActivity) {
    const dialogRef = this._dialog.open(AddUpdateActivitySalesTeamComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        // Add your logic here to handle the submitted form data
       console.log('Form data submitted:', formData);
      }
    });
  } 

  

  deleteActivity(id: number): void {
    // Implement delete functionality using your service
    this.activityService.deleteActivitySalesTeam(id).subscribe(() => {
      // Optionally perform any actions after successful deletion
      this.getAllSalesActivities(); // Reload the data after deletion
    });
  }

  getAllSalesActivities(): void {
    this.activityService.getAllActivitySalesTeam().subscribe((data: SalesActivity[]) => {
      this.dataSource.data = data;
    });
  } 

  loadActivitySalesTeamByClass(classSalesTeam: string): void {
  this.activityService.getActivitySalesTeamByClass(classSalesTeam)
    .subscribe((data: SalesActivity[]) => {
      if (classSalesTeam === 'Prospecting') {
        this.dataSource.data = this.activitySalesTeamProspecting = data;
      } else if (classSalesTeam === 'Negotiation') {
        this.dataSource.data = this.activitySalesTeamNegotiation = data;
      } else if (classSalesTeam === 'Closing') {
        this.dataSource.data = this.activitySalesTeamClosing = data;
      }
    });
}

  



}
