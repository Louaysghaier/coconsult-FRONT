import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Assignements} from '../_models/assignements';


@Injectable({
  providedIn: 'root'
})
export class AssignementsService {
  private baseUrl = 'http://localhost:8082/assignements'; // Remplacez cela par l'URL de votre API backend

  constructor(private http: HttpClient) { }

  getAllAssigns(): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/getAllAssigns`);
  }

  getAssign(id: number): Observable<Assignements> {
    return this.http.get<Assignements>(`${this.baseUrl}/getAssign/${id}`);
  }

  addAssign(assignements: Assignements): Observable<Assignements> {
    return this.http.post<Assignements>(`${this.baseUrl}/ajouterAssign`, assignements);
  }

  updateAssign(id: number, assignements: Assignements): Observable<Assignements> {
    return this.http.put<Assignements>(`${this.baseUrl}/updateAssig/${id}`, assignements);
  }

  removeAssign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveAssign/${id}`);
  }

  getAssignmentsForProject(projectId: number): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/getAssignmentsForProject`);
  }

  getAssignmentsUpdatedAfterDate(projectId: number, date: string): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/getAssignmentsUpdatedAfterDate?date=${date}`);
  }

  getLastAssignments(projectId: number, limit: number): Observable<Assignements[]> {
    return this.http.get<Assignements[]>(`${this.baseUrl}/${projectId}/getLastAssignments?limit=${limit}`);
  }
}
