import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from 'src/app/_services/contract.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/user_dashboard/core.service';
import { Contract } from 'src/app/_models/Contract';
import { AddUpdateContractComponent } from '../add-update-contract/add-update-contract.component';


@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  displayedColumns: string[] = ['idContract', 'description' , 'dateContract' ,'montant' , 'nbreTranche','etape','action']; // Adjust based on your contract model
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private _dialog: MatDialog, private _contractService: ContractService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getContractList();
  }

  openAddUpdateContractForm() {
    //const dialogRef = this._dialog.open(ActivitySalesTeamComponent);
    const dialogRef = this._dialog.open(AddUpdateContractComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContractList();
          console.log('c bon');
        }
      },
    });
  }
  

  getContractList() {
    this._contractService.getAllContracts().subscribe({
      next: (res:Contract[]) => {
        this.dataSource = new MatTableDataSource(res);
       // this.matHeaderCellDef=new matHeaderCellDef();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddUpdateContractComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContractList();
        }
      },
    });
  }

  deleteContract(contractId: number) {
      this._contractService.removeContract(contractId).subscribe({
        next: (res) => {
          //this._coreService.openSnackBar('Contract deleted successfully');

          this.getContractList();
        },
        error: (err) => {
          console.error(err);
          // Handle error
        }
      });
    
  }

  // Add other methods as needed
}
