import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Candidat } from 'src/app/_models/candidat';
import { CandidatService } from 'src/app/_services/candidat.service';
import { UploadService } from '../upload.service';
 // Import the file upload service

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent {
  candidatForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private candidatService: CandidatService,
    private fileUploadService: UploadService, // Inject the file upload service
    private router: Router
  ) {
    this.candidatForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      niveau: new FormControl('', Validators.required)
    });
  }

  ajoutercandidat(): void {
    if (this.candidatForm.valid && this.selectedFile) {
      const newCandidat: Candidat = {
        email: this.candidatForm.value.email,
        pdfFile:this.candidatForm.value.pdfFile,
        // Include other fields as needed
      };

      this.candidatService.ajoutercandidat(newCandidat)
        .subscribe(
          (response) => {
            sessionStorage.setItem('email', response.email);
            console.log('Candidat ajouté avec succès:', response);

            // Upload file after adding candidat
            this.uploadFile(response.id_candidat, this.selectedFile);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du candidat:', error);
          }
        );
    } else {
      console.error('Formulaire invalide ou aucun fichier sélectionné.');
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(candidatId: number, file: File): void {
    this.fileUploadService.uploadFile(candidatId, file)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.router.navigate(['/myquiz']);
          this.candidatForm.reset();
        },
        (error) => {
          console.error('Failed to upload file:', error);
        }
      );
  }
}