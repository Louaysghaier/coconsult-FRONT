import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Prospect } from 'src/app/_models/Prospect';
import { ProspectService } from 'src/app/_services/prospect.service';
import { AddUpdateProspectComponent } from '../add-update-prospect/add-update-prospect.component';
import { Repertoire } from 'src/app/_models/Repertoire';
import { TypeContact } from 'src/app/_models/typeContact';
import { priorite } from 'src/app/_models/priorite';
import { RepertoireService } from 'src/app/_services/repertoire.service';

@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.css']
})
export class ProspectListComponent implements OnInit, OnDestroy {
  prospects: Prospect[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  pagedProspects: Prospect[] = [];
  private prospectSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private prospectService: ProspectService ,
    private _repertoireService: RepertoireService // Inject RepertoireService

  ) {}

  ngOnDestroy(): void {
    if (this.prospectSubscription) {
      this.prospectSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadProspects();
  }

  openAddUpdateProspectForm() {
    const dialogRef = this.dialog.open(AddUpdateProspectComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadProspects();
      }
    });
  }

  openEditForm(data: Prospect) {
    const dialogRef = this.dialog.open(AddUpdateProspectComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadProspects();
      }
    });
  }

  deleteProspect(prospectId: number) {
    this.prospectService.removeProspect(prospectId).subscribe({
      next: (res) => {
        this.loadProspects();
      },
      error: console.error,
    });
  }

  updatePage() {
    const filteredProspects = this.filterProspects();
    const startIndex = this.currentPage * this.pageSize;
    this.pagedProspects = filteredProspects.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  loadProspects() {
    this.prospectSubscription = this.prospectService.getAllProspects().subscribe(prospects => {
      this.prospects = prospects;
      this.updatePage();
    });
  }

  filterProspects(): Prospect[] {
    return this.prospects.filter(prospect =>
      prospect.idProspect.toString().includes(this.searchTerm) ||
      prospect.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prospect.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prospect.Numtel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      prospect.status.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createRepertoireFromProspect(prospect: Prospect) {
    const repertoire: Repertoire = {
      contact: prospect.name,
      email: prospect.email,
      numTel: prospect.Numtel,
      TypeContact: TypeContact.QUALIFIED_LEAD,
      Priorite: priorite.FAIBLE,
      idRepertoire: 0, 
    };

    this._repertoireService.createRepertoireFromProspect(prospect).subscribe({
      next: () => {
        console.log('Repertoire created successfully from Prospect');
        
      },
      error: (err) => {
        console.error('Error creating Repertoire from Prospect:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.prospectService.uploadProspectsData(file).subscribe(
        response => {
          console.log('Prospects data uploaded successfully:', response);
          // Handle success message or any other action
        },
        error => {
          console.error('Error uploading prospects data:', error);
          // Handle error message or any other action
        }
      );
    }
  }
}
