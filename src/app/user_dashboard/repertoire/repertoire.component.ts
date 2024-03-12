import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepertoireService } from 'src/app/_services/repertoire.service';
import { CoreService } from '../core.service';
import { Repertoire } from 'src/app/_models/Repertoire';
import { AddUpdateRepertoiresComponent } from '../add-update-repertoires/add-update-repertoires.component';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {
  
  displayedColumns: string[] = ["idRepertoire","Contact","Numtel","email","typeContact","priorite","action"] 

  dataSource!: MatTableDataSource<Repertoire>; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private _dialog: MatDialog, private _repertoireService : RepertoireService ,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.GetAllRepertoires();
  }
  
  GetAllRepertoires() {
    this._repertoireService.GetAllRepertoire().subscribe((data:Repertoire[])=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
}

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  openAddUpdateRepertoireForm() {
    const dialogRef = this._dialog.open(AddUpdateRepertoiresComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllRepertoires();
          console.log('c bon');
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddUpdateRepertoiresComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.GetAllRepertoires();
        }
      },
    });
  } 

  deleteContract(idRepertoire: number) {
    this._repertoireService.RemoveRepertoire(idRepertoire).subscribe({
      next: (res) => {
        //this._coreService.openSnackBar('Contract deleted successfully');

        this.GetAllRepertoires();
      },
      error: (err) => {
        console.error(err);
        // Handle error
      }
    });
  
}
  

}
