import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractService } from '../../_services/contract.service';
import { RepertoireService } from '../../_services/repertoire.service';
import { UploadService } from '../../upload.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contract } from '../../_models/Contract';
import { Etape } from '../../_models/EtapeContract';

@Component({
  selector: 'app-add-update-contract',
  templateUrl: './add-update-contract.component.html',
  styleUrls: ['./add-update-contract.component.css']
})
export class AddUpdateContractComponent implements OnInit {
  contractForm: FormGroup;
  selectedFile: File | null = null;
  repertoires: any[] = []; // Property to hold the list of repertoires

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private repertoireService: RepertoireService,
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<AddUpdateContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.contractForm = this.formBuilder.group({
      repertoireId: ['', Validators.required],
      description: ['', Validators.required],
      dateContract: ['', Validators.required],
      montant: ['', Validators.required],
      nbreTranche: ['', Validators.required],
      etape: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRepertoires(); // Load repertoires when component initializes
    if (this.data) {
      this.contractForm.patchValue(this.data);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  loadRepertoires() {
    this.repertoireService.GetAllRepertoire().subscribe(repertoires => {
      this.repertoires = repertoires;
    });
  }

  onSubmit() {
    if (this.contractForm.valid) {
      const formData = this.contractForm.value;
      const pdfFile = this.contractForm.get('description').value; // Get the PDF file from the form
      const contractData = { ...formData };

      if (this.data) {
        contractData.idContract = this.data.idContract;
        this.contractService.updateContract(contractData).subscribe({
          next: () => {
            this.uploadFile(this.data.idContract, this.selectedFile);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        const repertoireId = this.contractForm.get('repertoireId').value; // Get the repertoireId from the form
        this.contractService.addContractAffectReper(contractData, repertoireId).subscribe({
          next: (val: any) => {
            this.uploadFile(val.idContract, this.selectedFile);
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  uploadFile(idContract: number, file: File): void {
    if (file) {
      this.uploadService.uploadFile(idContract, file)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully:', response);
            // Optionally reset the form after successful upload
            // this.contractForm.reset();
          },
          (error) => {
            console.error('Failed to upload file:', error);
          }
        );
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
