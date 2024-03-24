import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from './_models/reclamation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


 apiUrl = 'http://localhost:8082'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  ajouterReclamation(contenu: string, emailCandidat: string): Observable<Reclamation> {
    const url = `${this.apiUrl}/${emailCandidat}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Reclamation>(url, contenu, { headers: headers });
  }
}
