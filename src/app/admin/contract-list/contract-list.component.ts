import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ContractService } from 'src/app/_services/contract.service';
import { MatDialog } from '@angular/material/dialog';
import { Contract } from 'src/app/_models/Contract';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddUpdateContractComponent } from '../add-update-contract/add-update-contract.component';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit, OnDestroy {
  contracts: Contract[] = [];
  repertoires: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10; // Number of items per page
  currentPage: number = 0; // Current page number
  pagedContracts: Contract[] = []; // Contracts displayed on the current page
  private contractSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    private _dialog: MatDialog,
    private contractService: ContractService,
    private fileUploadService: UploadService,
  ) {}

  ngOnDestroy(): void {
    if (this.contractSubscription) {
      this.contractSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadContracts();
  }

  openAddUpdateContractForm() {
    const dialogRef = this._dialog.open(AddUpdateContractComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadContracts(); // Reload the contract list if the dialog returns a truthy value
      }
    });
  }

  openEditForm(data: Contract) {
    const dialogRef = this._dialog.open(AddUpdateContractComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadContracts(); // Reload the contract list if the dialog returns a truthy value
      }
    });
  }
  openPdf(description: string): void {
    this.fileUploadService.getPdf(description).subscribe(
      (pdfData) => {
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Failed to fetch PDF:', error);
      }
    );
  }

  deleteContract(contractId: number) {
    this.contractService.removeContract(contractId).subscribe({
      next: (res) => {
        this.loadContracts();
      },
      error: console.error,
    });
  }

  updatePage() {
    const filteredContracts = this.filterContracts();
    const startIndex = this.currentPage * this.pageSize;
    this.pagedContracts = filteredContracts.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  loadContracts() {
    this.contractSubscription = this.contractService.getAllContracts().subscribe(contracts => {
      this.contracts = contracts;
      this.updatePage();
    });
  }


  filterContracts(): Contract[] {
    return this.contracts.filter(contract =>
      contract.idContract.toString().includes(this.searchTerm) ||
      contract.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contract.dateContract.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contract.montant.toString().includes(this.searchTerm) ||
      contract.nbreTranche.toString().includes(this.searchTerm)
    );
  }
}
