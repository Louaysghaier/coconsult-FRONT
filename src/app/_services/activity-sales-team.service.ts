import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesActivity } from '../_models/ActivitySalesTeam';

@Injectable({
  providedIn: 'root'
})
export class ActivitySalesTeamService {
  private baseUrl = 'http://localhost:8082/ActivitySalesTeam'; 

  constructor(private http: HttpClient) { }

  getAllActivitySalesTeam(): Observable<SalesActivity[]> {
    return this.http.get<SalesActivity[]>(`${this.baseUrl}/GetAllActSalesTeam`);
  }

  getActivitySalesTeamById(id: number): Observable<SalesActivity> {
    return this.http.get<SalesActivity>(`${this.baseUrl}/GetActSalesTeamByID/${id}`);
  }

  addActivitySalesTeam(activity: SalesActivity): Observable<SalesActivity> {
    return this.http.post<SalesActivity>(`${this.baseUrl}/ajouterActSalesTeam`, activity);
  }

  updateActivitySalesTeam(id: number, activity: SalesActivity): Observable<SalesActivity> {
    return this.http.put<SalesActivity>(`${this.baseUrl}/updateActSalesTeam/${id}`, activity);
  }

  deleteActivitySalesTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveActSales/${id}`);
  } 

  getActivitySalesTeamByClass(classSalesTeam: string): Observable<SalesActivity[]> {
    return this.http.get<SalesActivity[]>(`${this.baseUrl}/GetActivitySalesTeamByClass/${classSalesTeam}`);
  }
}
