import { Component, OnInit } from '@angular/core';
import { JobOpport } from '../_models/jobopport';
import { JobopportService } from '../_services/jobopport.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-opport',
  templateUrl: './job-opport.component.html',
  styleUrls: ['./job-opport.component.css']
})
export class JobOpportComponent implements OnInit {
  jobOpports$: Observable<JobOpport[]>;

  constructor(private jobOpportService: JobopportService) { }
  ngOnInit(): void {
    this.jobOpports$ = this.getAllJobOpports();
  }

  getAllJobOpports(): Observable<JobOpport[]> {
    return this.jobOpportService.getAllJobOpports();
  }
}
