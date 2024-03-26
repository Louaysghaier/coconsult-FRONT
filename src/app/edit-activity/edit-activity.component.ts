import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity, ActivityType } from '../_models/Activity';
import { ActivityService } from '../_services/activity.service';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activityId!: number;
  activity: Activity = new Activity();

  constructor(private route: ActivatedRoute, private router: Router, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityId = this.route.snapshot.params['id'];
    this.loadActivity(this.activityId);
  }

  loadActivity(id: number) {
    this.activityService.getActivityBayID(id).subscribe(activity => {
      this.activity = activity;
    });
  }

  updateActivity() {
    this.activityService.editActivity(this.activityId, this.activity).subscribe(() => {
      this.router.navigate(['/activities']);
    });
  }
  taskTypes: string[] = Object.values(ActivityType);


}
