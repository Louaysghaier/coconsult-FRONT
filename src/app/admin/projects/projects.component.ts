import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../../_models/projects';
import {ProjetsService} from '../../_services/project.service';
import {ProjFeed} from '../../_models/projectFeed';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  //@ViewChild('editProjectModal') editProjectModal: any; // Définir la référence au modèle modal d'édition de projet
  //@ViewChild('addProjectModal') addProjectModal: any; // Définir la référence au modèle modal d'ajout de projet
  projects: Projects[] = [];
  newProject: Projects = new Projects();
  selectedProject: Projects = new Projects();

  totalProjects: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private modalService: NgbModal, private projectsService: ProjetsService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectsService.getAllProjets().subscribe(
        (data: Projects[]) => {
          this.projects = data;
        },
        (error: any) => {
          console.error('Error fetching projects:', error);
        }
    );
  }
    validerProjet(idProject: number): void {
        this.projectsService.validateProject(idProject).subscribe(
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
    saveProject(): void {
    this.projectsService.addProjets(this.newProject).subscribe(
        (response: Projects) => {
          console.log('Project saved:', response);
          this.modalService.dismissAll();
          this.newProject = new Projects(); // Reset newProject object
          this.getAllProjects(); // Refresh project list
        },
        (error: any) => {
          console.error('Error saving project:', error);
        }
    );
  }

  /*openEditModal(project: Projects, content: any): void {
    // Pré-remplir les champs du formulaire avec les valeurs du projet sélectionné
    this.selectedProject = { ...project }; // Utilisez une copie pour éviter de modifier directement l'objet original
    // Ouvrir le modal d'édition
    this.modalService.open(content, { ariaLabelledBy: 'editProjectModalLabel' });
  }*/

  updateProject(): void {
    this.projectsService.updateProjets(this.selectedProject.idProjet, this.selectedProject).subscribe(
        (response: Projects) => {
          console.log('Project updated:', response);
          // Rafraîchir les données après la mise à jour
          this.getAllProjects();
          // Fermer le modal d'édition
          this.modalService.dismissAll();
        },
        (error: any) => {
          console.error('Error updating project:', error);
        }
    );
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectsService.deleteProjets(id).subscribe(
          () => {
            this.getAllProjects(); // Refresh project list
            console.log('Project deleted:', id);
          },
          (error: any) => {
            console.error('Error deleting project:', error);
          }
      );
    }
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
  }

  openAddProjectModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'addProjectModalLabel' });
  }

}
