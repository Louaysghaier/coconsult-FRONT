import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/user/list-RolesName/Employee'; 

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8082/api/user/getUserById/${userId}`);
  }
}
