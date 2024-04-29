import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { event } from 'jquery';
import { Profil } from '../_models/profil';
import { response } from 'express';
import { Candidat } from '../_models/candidat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 
  selectedPhoto: File;
  adresse: string;
  telephone: string;
  candidatInfo:string;
  competence: string;
  info: string;
  candidat: Candidat;
  candidatId: number = 11;
  showInfoInput: boolean = false;
  showCompetenceInput: boolean = false;
  showphotoInput: boolean = false;
  photoUrl: string | ArrayBuffer | null = null;
  constructor(private candidatService: ProfileService,  private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.loadCandidatPhoto();
    this.getCandidatById(this.candidatId);
   
   
  }
  toggleInfoInput() {
    this.showInfoInput = !this.showInfoInput;
  }
  togglephotoInput() {
    this.showphotoInput = !this.showphotoInput;
  }
  toggleCompetenceInput() {
    this.showCompetenceInput = !this.showCompetenceInput;
  }
  getCandidatById(id: number): void {
    this.candidatService.getCandidatById(id)
      .subscribe(candidat => this.candidat = candidat);
  }
  onFileSelected(event): void {
    this.selectedPhoto = event.target.files[0];
  }

  onUploadPhoto(): void {
    if (this.selectedPhoto) {
      this.candidatService.uploadPhoto(11, this.selectedPhoto)
        .subscribe(
          response => {
            console.log('Photo uploaded successfully:', response);
        
          },
          error => {
            console.error('Failed to upload photo:', error);
            this.loadCandidatPhoto();
          }
        );
    }
  }
    loadCandidatPhoto() {
    this.candidatService.getCandidatPhoto(11)
      .subscribe(
        (response) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.photoUrl = reader.result;
          };
          reader.readAsDataURL(response);
        },
        (error) => {
          console.error('Une erreur est survenue lors du chargement de la photo du candidat :', error);
        }
      );
  }
 

  
  onSubmitt(): void {
    this.candidatService.createCompetence(11, this.competence)
      .subscribe(
        response => {
          console.log('Candidat created successfully:', response);
          // Gérer la réponse de l'API, rediriger vers une autre page, etc.
        },
        error => {
          console.error('Failed to create candidat:', error);
          this.getCandidatById(this.candidatId);
        }
      );
  }

  onSubmit(): void {
    this.candidatService.createCandidat(11, this.info)
      .subscribe(
        response => {
          console.log('Candidat created successfully:', response);
          // Gérer la réponse de l'API, rediriger vers une autre page, etc.
        },
        error => {
          console.error('Failed to create candidat:', error);
          this.getCandidatById(this.candidatId);
        }
      );
  }
  updateJobs(): void {
    this.candidatService.updateJob(11, this.competence).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('job updated successfully:', response);
      },
      (error) => {
        // Handle error, if needed
        console.error('Error updating job:', error);
      }
    );
  }


}
