// pointage.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private baseURL = 'http://localhost:8082/api/pointage'; // Adjust the URL as per your API

  constructor(private http: HttpClient) { }

  recordPointage(userData: { user: { id: number } }): Observable<any> {
    return this.http.post(`${this.baseURL}/add-pointage`, userData);
  }
}
