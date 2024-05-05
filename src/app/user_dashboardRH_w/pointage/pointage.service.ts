// pointage.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private baseURL = 'http://localhost:8082/api/pointage'; // Adjust the URL as per your API

  constructor(private http: HttpClient) { }

  recordPointage(userData: { user: { id: number } }): Observable<any> {
    return this.http.post(`${this.baseURL}/add-pointage`, userData);
  }
  addPointageForUser(userId: number): Observable<any> {
    if (!userId) {
      console.error('Invalid user ID');
      return throwError(() => new Error('Invalid user ID'));
    }
    return this.http.post(`${this.baseURL}/users/${userId}/pointage/add`, { userId });
  }
  

verifyReminder(userId: number, code: string) {
    const url = `${this.baseURL}/verify-reminder/${userId}/${code}`;
    return this.http.post(url, {});
  }
   
}
