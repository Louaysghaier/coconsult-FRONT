import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message';
import { environment } from 'src/environments/environment';
const headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})

export class notificationService {
  private baseURL  ="http://localhost:8082/Msg/getAll";
  private env = "http://localhost:8082/Msg/sendNotification";
  sendNotification(message: Message):Observable<any> {
    return this.httpClient.post<any>(this.env, message);
  }



  constructor(private httpClient: HttpClient) { }

  getListMessage(): Observable<Message[]>{
    return this.httpClient.get<Message[]>(this.baseURL,headers);
  }
  
}