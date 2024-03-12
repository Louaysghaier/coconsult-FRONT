import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Importez les modules requis

import { Candidat } from 'src/app/_models/candidat';
import { CandidatService } from 'src/app/_services/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent {
  candidatForm: FormGroup; // Déclarez un objet FormGroup

  constructor(private candidatService: CandidatService, private router: Router) {
    // Initialisez le FormGroup et définissez les champs requis avec les validateurs associés
    this.candidatForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Champs email avec validateurs required et email
      niveau: new FormControl('', Validators.required) // Champs niveau avec validateur required
    });
  }

  // Méthode pour ajouter un candidat
  ajoutercandidat(): void {
    // Vérifiez si le formulaire est valide avant de soumettre les données
    if (this.candidatForm.valid) {
      // Si le formulaire est valide, créez un objet Candidat à partir des valeurs du formulaire
      const newCandidat: Candidat = {
        email: this.candidatForm.value.email,
        niveau: this.candidatForm.value.niveau
      };

      // Appelez le service pour ajouter le candidat
      this.candidatService.ajoutercandidat(newCandidat)
        .subscribe(
          (response) => {
            sessionStorage.setItem('email', response.email);
            console.log('Candidat ajouté avec succès:', response);

            this.router.navigate(['/myquiz']);

            // Réinitialisez le formulaire après l'ajout du candidat
            this.candidatForm.reset();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du candidat:', error);
          }
        );
    } else {
      // Si le formulaire est invalide, affichez un message d'erreur
      console.error('Formulaire invalide. Veuillez remplir correctement tous les champs.');
    }
  }

}
