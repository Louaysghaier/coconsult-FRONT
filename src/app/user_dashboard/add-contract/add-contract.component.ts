import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractService } from 'src/app/_services/contract.service';



@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent {
  contractForm: FormGroup;

  constructor(private fb: FormBuilder, private contractService: ContractService) {
    this.contractForm = this.fb.group({
      description: ['', Validators.required],
      dateContract: ['', Validators.required],
      montant: [0, Validators.required],
      nbreTranche: [ 0, Validators.required],
      etape: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addContract(): void {
    if (this.contractForm.valid) {
      const newContract = this.contractForm.value;
      this.contractService.addContract(newContract).subscribe(
        (data) => {
          console.log('Contract added successfully:', data);
          // Reset the form for a new contract
          this.contractForm.reset();
        },
        (error) => {
          console.error('Error adding contract:', error);
        }
      );
    }
  }

}
