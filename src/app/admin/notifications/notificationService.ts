import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
@Injectable({
  providedIn: 'root'
})
export class notificationService {
  private baseURL  ="http://localhost:8081/api/message/list-message";

  constructor(private httpClient: HttpClient) { }

  getListMessage(): Observable<Message[]>{
    return this.httpClient.get<Message[]>(this.baseURL);
  }
  
}