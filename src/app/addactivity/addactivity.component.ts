import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, ActivityType } from '../_models/Activity';
import { ActivityService } from '../_services/activity.service';


@Component({
  selector: 'app-addactivity',
  templateUrl: './addactivity.component.html',
  styleUrls: ['./addactivity.component.css']
})
export class AddactivityComponent {
  activities: Activity[] = [];
  newActivity: Activity = new Activity(); 
  activityForm: FormGroup;
  taskTypes: string[] = Object.values(ActivityType);

  constructor(private activityService: ActivityService, private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      nbreOfTask: ['', [Validators.required, Validators.min(1)]],
      taskType: ['', Validators.required]
    });
  }

  addActivity() {
   // if (this.activityForm.valid) {
    
      this.activityService.addActivity(this.newActivity).subscribe(activity => {
        console.log("test")
        console.log(this.newActivity.taskType)
        this.activities.push(activity);
        this.newActivity = new Activity(); 
      });
 //   }
  }
}
