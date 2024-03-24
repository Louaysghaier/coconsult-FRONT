import { Component, EventEmitter, Output } from '@angular/core';
import { CandidatService } from '../_services/candidat.service';
import { Candidat } from '../_models/candidat';

@Component({
  selector: 'app-candidatemail',
  templateUrl: './candidatemail.component.html',
  styleUrls: ['./candidatemail.component.css']
})
export class CandidatemailComponent {
  email: string;
  @Output() emailSubmitted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail;
    }
  }

  onSubmit(): void {
    if (this.email) {
      sessionStorage.setItem('email', this.email);
      this.emailSubmitted.emit(this.email);
    }
  }
}