import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractService } from 'src/app/_services/contract.service';
import { CoreService } from '../core.service';
import { Etape } from 'src/app/_models/EtapeContract'




@Component({
  selector: 'app-add-update-contract',
  templateUrl: './add-update-contract.component.html',
  styleUrls: ['./add-update-contract.component.scss']
})
export class AddUpdateContractComponent implements OnInit {
  contractForm: FormGroup;
  steps: string[] = Object.keys(Etape).filter(key => isNaN(Number(Etape[key])));

  // Adjust based on your contract model
  constructor(
    private _fb: FormBuilder,
    private _contractService: ContractService,
    private _dialogRef: MatDialogRef<AddUpdateContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
   ) {
    this.contractForm = this._fb.group({
      description: '',
      //dateContract: '',
      montant: '',
      nbreTranche: '',
      etape: '',
      // Add other properties as needed based on your model
    });
  }

  ngOnInit(): void {
    this.contractForm.patchValue(this.data);
  }

  
  onFormSubmit() {
    if (this.contractForm.valid) {
      const updatedContract = {
        id: this.data.id, // Assuming `id` is the property representing the contract ID
        ...this.contractForm.value
      };
  
      if (this.data) {
        this._contractService
          .updateContract(updatedContract)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._contractService.addContract(this.contractForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
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
