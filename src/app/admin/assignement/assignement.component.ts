import { Component, OnInit } from '@angular/core';
import {Assignements} from '../../_models/assignements';
import {AssignementsService} from '../../_services/assignements.service';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignement.component.html',
  styleUrls: ['./assignement.component.css']
})
export class AssignementsComponent implements OnInit {
  assignementsList: Assignements[] = [];
  newAssignement: Assignements = new Assignements();
  errorMessage: string = '';

  constructor(private assignementsService: AssignementsService) { }

  ngOnInit(): void {
    this.getAllAssignments();
  }

  getAllAssignments(): void {
    this.assignementsService.getAllAssigns().subscribe(
        (assignements: Assignements[]) => {
          this.assignementsList = assignements;
          this.errorMessage = '';
        },
        (error: any) => {
          this.errorMessage = 'Une erreur s\'est produite lors du chargement des assignements.';
          console.error(error);
        }
    );
  }

  addAssignement(): void {
    if (!this.newAssignement.idAssign || !this.newAssignement.projects || !this.newAssignement.expenses || !this.newAssignement.timeRecording) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.assignementsService.addAssign(this.newAssignement).subscribe(
        () => {
          this.errorMessage = '';
          this.getAllAssignments(); // Recharger la liste des assignements après l'ajout
          this.newAssignement = new Assignements(); // Réinitialiser le nouveau assignement
        },
        (error: any) => {
          this.errorMessage = 'Une erreur s\'est produite lors de l\'ajout de l\'assignement.';
          console.error(error);
        }
    );
  }

  deleteAssignement(id: number): void {
    this.assignementsService.removeAssign(id).subscribe(
        () => {
          this.errorMessage = '';
          this.getAllAssignments(); // Recharger la liste des assignements après la suppression
        },
        (error: any) => {
          this.errorMessage = 'Une erreur s\'est produite lors de la suppression de l\'assignement.';
          console.error(error);
        }
    );
  }

    protected readonly Assignements = Assignements;
}
