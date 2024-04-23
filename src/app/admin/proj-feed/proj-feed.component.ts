import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjFeed } from '../../_models/projectFeed';
import { ProjFeedService } from '../../_services/projectfeed.service';

@Component({
    selector: 'app-proj-feed',
    templateUrl: './proj-feed.component.html',
    styleUrls: ['./proj-feed.component.css']
})
export class ProjFeedComponent implements OnInit {
    projFeeds: ProjFeed[] = [];
    newProjFeed: ProjFeed = new ProjFeed();
    selectedProjFeed: ProjFeed = new ProjFeed();

    totalProjFeeds: number = 0;
    pageSize: number = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    constructor(private modalService: NgbModal, private projFeedService: ProjFeedService) { }

    ngOnInit(): void {
        this.getAllProjFeeds();
    }

    getAllProjFeeds(): void {
        this.projFeedService.getAllProjFeeds().subscribe(
            (data: ProjFeed[]) => {
                this.projFeeds = data;
            },
            (error: any) => {
                console.error('Error fetching project feeds:', error);
            }
        );
    }

    saveProjFeed(): void {
        this.projFeedService.addProjFeed(this.newProjFeed).subscribe(
            (response: ProjFeed) => {
                console.log('Project feed saved:', response);
                this.modalService.dismissAll();
                this.newProjFeed = new ProjFeed(); // Reset newProjFeed object
                this.getAllProjFeeds(); // Refresh project feed list
            },
            (error: any) => {
                console.error('Error saving project feed:', error);
            }
        );
    }
    openEditModal(projFeed: ProjFeed): void {
        // Pré-remplir les champs du formulaire avec les valeurs du projet feed sélectionné
        this.selectedProjFeed = { ...projFeed }; // Utilisez une copie pour éviter de modifier directement l'objet original
        // Ouvrir le modal d'édition
        this.modalService.open( { ariaLabelledBy: 'editProjFeedModalLabel' });
    }


    editProjFeed(projFeed: ProjFeed, content: any): void {
        this.selectedProjFeed = projFeed;
        this.modalService.open(content, { ariaLabelledBy: 'editProjFeedModalLabel' });
    }

   /* updateProjFeed(): void {
        this.projFeedService.updateProjFeed(this.selectedProjFeed.idPjtFeed, this.selectedProjFeed).subscribe(
            (response: ProjFeed) => {
                console.log('Project feed updated:', response);
                // Optionally, you can dismiss modal and refresh project feed list here
                // this.modalService.dismissAll();
                // this.getAllProjFeeds();
            },
            (error: any) => {
                console.error('Error updating project feed:', error);
            }
        );
    }*/
    updateProjFeed(): void {
        this.projFeedService.updateProjFeed(this.selectedProjFeed.idPjtFeed, this.selectedProjFeed).subscribe(
            (response: ProjFeed) => {
                console.log('Project feed updated:', response);
                // Rafraîchir les données après la mise à jour
                this.getAllProjFeeds();
                // Fermer le modal d'édition
                this.modalService.dismissAll();
            },
            (error: any) => {
                console.error('Error updating project feed:', error);
            }
        );
    }

    deleteProjFeed(id: number): void {
        if (confirm('Are you sure you want to delete this project feed?')) {
            this.projFeedService.deleteProjFeed(id).subscribe(
                () => {
                    this.getAllProjFeeds(); // Refresh project feed list
                    console.log('Project feed deleted:', id);
                },
                (error: any) => {
                    console.error('Error deleting project feed:', error);
                }
            );
        }
    }

    onPageChange(event: any): void {
        this.pageSize = event.pageSize;
    }

    openAddProjFeedModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'addProjFeedModalLabel' });
    }

}
