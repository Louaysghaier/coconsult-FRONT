import { Component } from '@angular/core';
import { CandidatDetailsDTO } from 'src/app/_models/candidatDetail';
import { CandidatService } from 'src/app/_services/candidat.service';

@Component({
  selector: 'app-candidatresult',
  templateUrl: './candidatresult.component.html',
  styleUrls: ['./candidatresult.component.css']
})
export class CandidatresultComponent {
  candidatDetails: CandidatDetailsDTO[];

  constructor(private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.getCandidatDetails();
  }

  getCandidatDetails(): void {
    this.candidatService.getCandidatDetails()
      .subscribe(data => {
        this.candidatDetails = data;
      }, error => {
        console.error('Error fetching candidat details:', error);
      });
  }
}