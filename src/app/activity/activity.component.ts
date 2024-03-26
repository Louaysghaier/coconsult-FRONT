import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from '../_services/activity.service';
import { Activity } from '../_models/Activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  newActivity: Activity = new Activity(); // Ajoutez cette ligne pour créer une nouvelle activité
  constructor(private router: Router, private activityService: ActivityService){
  }
  ngOnInit(): void {
    this.loadActivities();
  }
  loadActivities() {
    this.activityService.getAllActivities().subscribe(activities => {
      this.activities = activities;
    });
  }
  editActivity(activityId: number) {
    this.router.navigate(['/edit', activityId]); 
  }
  deleteActivity(activityId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette activité?")) {
      this.activityService.deleteActivity(activityId).subscribe(() => {
        this.loadActivities(); 
      });
    }
  }
  

  

  
  
  

}
