import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobOpport } from '../_models/jobopport';

@Injectable({
  providedIn: 'root'
})
export class JobopportService {

 baseUrl = 'http://localhost:8082/jobopports'; // Update with your actual backend URL

  constructor(private http: HttpClient) { }


  getAllJobOpports(): Observable<JobOpport[]> {
    return this.http.get<JobOpport[]>(`${this.baseUrl}/getalljob`);
  }
  


 

  getJobOpportById(id: number): Observable<JobOpport> {
    return this.http.get<JobOpport>(`${this.baseUrl}`);
  }
}

