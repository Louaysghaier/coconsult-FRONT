import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from 'src/app/_models/Contract';
import { ContractService } from 'src/app/_services/contract.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
  contracts: Contract[] = [];
  contractForm: FormGroup;

  dataSource: MatTableDataSource<Contract>;
  displayedColumns: string[] = ['idContract', 'description', 'dateContract', 'montant', 'nbreTranche', 'etape', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private contractService: ContractService, private fb: FormBuilder) {
    this.contractForm = this.fb.group({
      description: ['', Validators.required],
      dateContract: ['', Validators.required],
      montant: [0, Validators.required],
      nbreTranche: [0, Validators.required],
      etape: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchContracts();
  }

  fetchContracts(): void {
    this.contractService.getAllContracts().subscribe(
      (data) => {
        this.contracts = data;
        this.dataSource = new MatTableDataSource(this.contracts);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching contracts:', error);
      }
    );
  }

  
}
