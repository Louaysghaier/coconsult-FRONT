import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {
  private baseURL  ="http://localhost:8082/api/user/list-user";
  private baseURLactive  ="http://localhost:8082/api/user/validate-user/";
  private baseUserRole  ="http://localhost:8082/api/user/list-RolesName/";
  private baseBlockedUser="http://localhost:8082/api/user/bloque-user/";
  private baseGetUserById = "http://localhost:8082/api/user/getUserById/";




  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseURL);
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseGetUserById + id);
  }
  activateUser(id:Number): Observable<any> {
    return this.httpClient.put(this.baseURLactive+id, id);
    }

  getUserByRoles(RolesName:String):Observable<any>{
    const url = `${this.baseUserRole}`+RolesName;
    return this.httpClient.get<any>(url);
  }

  bloquerUser(id:Number):Observable<any>{
    return this.httpClient.put(this.baseBlockedUser+id, id);
  }


}