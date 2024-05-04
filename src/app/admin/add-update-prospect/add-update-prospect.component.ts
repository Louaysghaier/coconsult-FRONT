import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prospect } from '../../_models/Prospect';
import { ProspectStatus } from '../../_models/ProspectStatus';
import { ProspectService } from '../../_services/prospect.service';

@Component({
  selector: 'app-add-update-prospect',
  templateUrl: './add-update-prospect.component.html',
  styleUrls: ['./add-update-prospect.component.css']
})
export class AddUpdateProspectComponent implements OnInit {
  prospectForm: FormGroup;
  prospectStatusOptions = Object.values(ProspectStatus);

  constructor(
    private formBuilder: FormBuilder,
    private prospectService: ProspectService,
    private dialogRef: MatDialogRef<AddUpdateProspectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.prospectForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Numtel: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.prospectForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.prospectForm.valid) {
      const formData = this.prospectForm.value;
      const prospectData = { ...formData };

      if (this.data) {
        prospectData.idProspect = this.data.idProspect;
        this.prospectService.updateProspect(prospectData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.prospectService.addProspect(prospectData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
