



import { Component, EventEmitter, Output } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidatemail',
  templateUrl: './candidatemail.component.html',
  styleUrls: ['./candidatemail.component.css']
})
export class CandidatemailComponent {
  email: string;
  @Output() emailSubmitted = new EventEmitter<string>();

  constructor(private candidatService: CandidatService, private router: Router) { }

  ngOnInit(): void {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail;
    }
  }

  onSubmit(): void {
    if (this.email) {
      this.candidatService.verifierPassageTest(this.email).subscribe(
        (result: boolean) => {
          if (!result) {
            sessionStorage.setItem('email', this.email);
            this.emailSubmitted.emit(this.email);
            Swal.fire('ARE YOU READY');
            this.router.navigateByUrl('/myquiz');
          } else {
            Swal.fire('Error', 'Vous avez deja passez le test', 'error');
          }
        },
        error => {
          console.error('Erreur lors de la vérification du passage du test:', error);
          
        }
      );
    }
  }
}
