import { Component } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOpport } from '../_models/jobopport';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Assurez-vous de mettre le chemin correct

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent {
  email: string;
  selectedFile: File;
  submittedEmails: string[] = []; // Liste des emails déjà soumis

  constructor(private candidatService: CandidatService, private router: Router) { }

  onSubmit(): void {
    if (!this.selectedFile || !this.email) {
      Swal.fire('Erreur', 'Veuillez sélectionner un fichier et saisir votre e-mail.', 'error');
      return;
    }

    // Vérifier si l'email a déjà été soumis
    if (this.submittedEmails.includes(this.email)) {
      Swal.fire('Erreur', 'Cet email a déjà été soumis.', 'error');
      return;
    }

    // Ajouter l'email à la liste des emails soumis
    this.submittedEmails.push(this.email);
  
    this.candidatService.uploadAndExtract(this.selectedFile, this.email)
      .then(response => {
        Swal.fire('Réponse du réseau', response, 'success');
        this.router.navigateByUrl('/myquiz');
      })
      .catch(response => {
        Swal.fire('Votre demande est en cours de verification , merci de verifier votre mail pour plus de detail ');
      });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }
}