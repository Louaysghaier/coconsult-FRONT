import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Repertoire } from 'src/app/_models/Repertoire';
import { RepertoireService } from 'src/app/_services/repertoire.service';
import { AddUpdateRepertoireComponent } from '../add-update-repertoire/add-update-repertoire.component';


@Component({
  selector: 'app-repertoire-list',
  templateUrl: './repertoire-list.component.html',
  styleUrls: ['./repertoire-list.component.css']
})
export class RepertoireListComponent implements OnInit, OnDestroy {
  repertoires: Repertoire[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  pagedRepertoires: Repertoire[] = [];
  private repertoireSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private repertoireService: RepertoireService
  ) {}

  ngOnDestroy(): void {
    if (this.repertoireSubscription) {
      this.repertoireSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadRepertoires();
  }

  openAddUpdateRepertoireForm() {
    const dialogRef = this.dialog.open(AddUpdateRepertoireComponent);
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadRepertoires();
      }
    });
  }

  openEditForm(data: Repertoire) {
    const dialogRef = this.dialog.open(AddUpdateRepertoireComponent, {
      data,
    });
  
    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.loadRepertoires();
      }
    });
  }

  deleteRepertoire(repertoireId: number) {
    this.repertoireService.RemoveRepertoire(repertoireId).subscribe({
      next: (res) => {
        this.loadRepertoires();
      },
      error: console.error,
    });
  }

  updatePage() {
    const filteredRepertoires = this.filterRepertoires();
    const startIndex = this.currentPage * this.pageSize;
    this.pagedRepertoires = filteredRepertoires.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  loadRepertoires() {
    this.repertoireSubscription = this.repertoireService.GetAllRepertoire().subscribe(repertoires => {
      this.repertoires = repertoires;
      this.updatePage();
    });
  }

  filterRepertoires(): Repertoire[] {
    return this.repertoires.filter(repertoire =>
      repertoire.idRepertoire.toString().includes(this.searchTerm) ||
      repertoire.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      repertoire.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      repertoire.numTel.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      repertoire.TypeContact.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      repertoire.Priorite.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  
}
