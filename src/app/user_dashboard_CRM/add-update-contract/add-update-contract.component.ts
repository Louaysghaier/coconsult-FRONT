import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractService } from 'src/app/_services/contract.service';
import { CoreService } from '../core.service';
import { RepertoireService } from 'src/app/_services/repertoire.service'; // Import RepertoireService
import { UploadService } from 'src/app/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-update-contract',
  templateUrl: './add-update-contract.component.html',
  styleUrls: ['./add-update-contract.component.scss']
})
export class AddUpdateContractComponent implements OnInit {
  contractForm: FormGroup;
  selectedFile: File | null = null;

  repertoires: any[] = []; // Property to hold the list of repertoires

  constructor(
    private _fb: FormBuilder,
    private _contractService: ContractService,
    private fileUploadService: UploadService,
    private router: Router,
    private _dialogRef: MatDialogRef<AddUpdateContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _repertoireService: RepertoireService // Inject RepertoireService
  ) {
    this.contractForm = this._fb.group({
      repertoireId: '', // Add a new field for repertoireId
      description: '',
      dateContract: '',
      montant: '',
      nbreTranche: '',
      etape: '',
    });
  }

  ngOnInit(): void {
    this.loadRepertoires(); // Load repertoires when component initializes
    this.contractForm.patchValue(this.data);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(idContract: number, file: File): void {
    this.fileUploadService.uploadFile(idContract, file)
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

  loadRepertoires() {
    this._repertoireService.GetAllRepertoire().subscribe(repertoires => {
      this.repertoires = repertoires;
    });
  }

  onFormSubmit() {
    if (this.contractForm.valid) {
      const formData = this.contractForm.value;
      //const pdfFile = this.contractForm.get('description').value; // Get the PDF file from the form
      const contractData = {
        ...formData,
        //pdfFile: pdfFile  // Add PDF file to the contract data
      };
  
      if (this.data) {
        contractData.idContract = this.data.idContract;
        this._contractService.updateContract(contractData).subscribe({
          next: () => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        const repertoireId = this.contractForm.get('repertoireId').value; // Get the repertoireId from the form
        contractData.repertoireContact = null; // Clear repertoireContact field as it will be set automatically
        this._contractService.addContractAffectRepAndGeneratePdf(contractData, repertoireId).subscribe({
          next: (pdfBlob: Blob) => {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  
  
  
  
}