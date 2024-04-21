import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepertoireService } from '../../_services/repertoire.service';
import { Repertoire } from '../../_models/Repertoire';

@Component({
  selector: 'app-add-update-repertoire',
  templateUrl: './add-update-repertoire.component.html',
  styleUrls: ['./add-update-repertoire.component.css']
})
export class AddUpdateRepertoireComponent implements OnInit {
  repertoireForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private repertoireService: RepertoireService,
    private dialogRef: MatDialogRef<AddUpdateRepertoireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.repertoireForm = this.formBuilder.group({
      contact: ['', Validators.required],
      numTel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typeContact: ['', Validators.required],
      priorite: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.repertoireForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.repertoireForm.valid) {
      const formData = this.repertoireForm.value;
      const repertoireData = { ...formData };

      if (this.data) {
        // Update existing repertoire
        this.repertoireService.updateRepertoire(repertoireData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        // Add new repertoire
        this.repertoireService.addRepertoire(repertoireData).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
