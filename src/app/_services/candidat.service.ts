import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidat } from '../_models/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:8082/candidat/';
apiurl1='http://localhost:8082/quizzes/verifyexistedmail/'

private baseUrl = 'http://localhost:8082'; // Mettez l'URL de votre API Spring Boot



uploadFile(file: File) {
  const formData: FormData = new FormData();
  formData.append('file', file);

  return this.http.post<string>(`${this.baseUrl}/upload`, formData);
}






  ajoutercandidat(candidat: Candidat): Observable<Candidat> {
    return this.http.post<Candidat>(this.apiUrl + 'createcandidat', candidat);
}


submitAnswer(candidat: Candidat): Observable<Candidat> {
  return this.http.post<Candidat>(this.apiUrl + 'ajouter', candidat);
}

getSelectedAnswersByCandidat(candidatId: number): Observable<string[]> {
  const url = `${this.apiUrl}/selected-answers/${candidatId}`;
  return this.http.get<string[]>(url);
}
existedmail(mail:string):Observable<boolean>{
return this.http.post<boolean>(this.apiurl1+mail,null)
}
deleteCandidat(id: number): Observable<any> {
  const url = `${this.apiUrl}deletecandidat/${id}`;
  return this.http.delete<any>(url, { observe: 'response' })
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
}
notifyCandidatesWithScoreGreaterThan5() {
  return this.http.post(`${this.apiUrl}resultatdansmail`, {});
}
}

