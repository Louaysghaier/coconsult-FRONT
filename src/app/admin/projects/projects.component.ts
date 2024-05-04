import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../../_models/projects';
import {ProjetsService} from '../../_services/project.service';
import {ProjFeed} from '../../_models/projectFeed';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  //@ViewChild('editProjectModal') editProjectModal: any; // Définir la référence au modèle modal d'édition de projet
  //@ViewChild('addProjectModal') addProjectModal: any; // Définir la référence au modèle modal d'ajout de projet
    @ViewChild(MatPaginator) paginator: MatPaginator;
    projects: Projects[] = [];
    totalProjects: number = 5;
    searchTerm: string = '';
    pageSize: number = 5;
    currentPage: number = 0;
    pagedProjects: Projects[] = [];
    private projectSubscription: Subscription;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    newProject: Projects = new Projects();
    selectedProject: Projects = new Projects();




    constructor(
        private dialog: MatDialog, private modalService: NgbModal,
        private projectService: ProjetsService)
    {}

    ngOnDestroy(): void {
        if (this.projectSubscription) {

            this.projectSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.loadProjects();

    }

    openAddUpdateProjectForm() {
        const dialogRef = this.dialog.open(ProjectsComponent);
        dialogRef.afterClosed().subscribe((val) => {
            if (val) {
                this.loadProjects();
            }
        });
    }

    saveProject(): void {
        this.projectService.addProjets(this.newProject).subscribe(
            (response: Projects) => {
                console.log('Project saved:', response);
                this.modalService.dismissAll();
                this.newProject = new Projects(); // Reset newProject object
                this.loadProjects(); // Refresh project list
            },
            (error: any) => {
                console.error('Error saving project:', error);
            }
        );
    }
    openEditForm(data: Projects) {
        const dialogRef = this.dialog.open(ProjectsComponent, {
            data,
        });

        dialogRef.afterClosed().subscribe((val) => {
            if (val) {
                this.loadProjects();
            }
        });
    }
    validerProjet(idProject: number): void {
        this.projectService.validateProject(idProject).subscribe(
            () => {
                console.log('Le projet a été validé avec succès.');
                // Traitez les actions supplémentaires après la validation du projet si nécessaire
            },
            error => {
                console.error('Une erreur s\'est produite lors de la validation du projet : ', error);
            }
        );
    }
    openEditModal(project: Projects): void {
        // Pré-remplir les champs du formulaire avec les valeurs du projet feed sélectionné
        this.selectedProject = { ...project }; // Utilisez une copie pour éviter de modifier directement l'objet original
        // Ouvrir le modal d'édition
        this.modalService.open({ ariaLabelledBy: 'editProjectModalLabel' });
    }


    deleteProject(projectId: number) {
        this.projectService.deleteProjets(projectId).subscribe({
            next: (res) => {
                this.loadProjects();
            },
            error: console.error,
        });
    }

    updatePage() {
        const filteredProjects = this.filterProjects();
        const startIndex = this.currentPage * this.pageSize;
        this.pagedProjects = filteredProjects.slice(startIndex, startIndex + this.pageSize);
    }

    onPageChange(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePage();
    }

    loadProjects() {
        this.projectSubscription = this.projectService.getAllProjets().subscribe(projects => {
            this.projects = projects;
            this.updatePage();
        });
    }
    updateProject(): void {
        this.projectService.updateProjets(this.selectedProject.idProjet, this.selectedProject).subscribe(
            (response: Projects) => {
                console.log('Project updated:', response);
                this.loadProjects();
                                                // Fermer
                this.modalService.dismissAll();
            },
            (error: any) => {
                console.error('Error updating project:', error);
            }
        );
    }

    filterProjects(): Projects[] {
        return this.projects.filter(project =>
            project.idProjet.toString().includes(this.searchTerm) ||
            project.projetTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    /*onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.projectService.uploadProjectsData(file).subscribe(
                response => {
                    console.log('Projects data uploaded successfully:', response);
                    // Handle success message or any other action
                },
                error => {
                    console.error('Error uploading projects data:', error);
                    // Handle error message or any other action
                }
            );
        }
    }*/
}
