import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesActivity } from 'src/app/_models/ActivitySalesTeam';

@Component({
  selector: 'app-add-update-activity-sales-team',
  templateUrl: './add-update-activity-sales-team.component.html',
  styleUrls: ['./add-update-activity-sales-team.component.scss']
})
export class AddUpdateActivitySalesTeamComponent implements OnInit {
  activityForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddUpdateActivitySalesTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesActivity
  ) {
    this.activityForm = this._fb.group({
      heureStart: ['', Validators.required],
      heureEnd: ['', Validators.required],
      description: ['', Validators.required],
      typeAct: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.activityForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.activityForm.valid) {
      const formData = this.activityForm.value;
      this._dialogRef.close(formData);
    }
  }
}
