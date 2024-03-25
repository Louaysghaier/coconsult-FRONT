import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidat } from '../_models/candidat';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:8082/candidat';
apiurl1='http://localhost:8082/quizzes/verifyexistedmail/'

 baseUrl = 'http://localhost:8082'; 
 
 
 
 uploadAndExtract(jobOpportId: number, file: File, email: string): Observable<string> {
  // Construire les données à envoyer
  const formData = new FormData();
  formData.append('jobOpportId', jobOpportId.toString());
  formData.append('file', file);
  formData.append('email', email);

  // Définir les en-têtes pour la requête multipart/form-data
  const headers = new HttpHeaders();
  // Pas besoin de spécifier le Content-Type, car le navigateur le fera automatiquement pour FormData

  // Envoyer la requête POST au backend
  return this.http.post<string>('http://localhost:8082/uploadAndExtract', formData, { headers });
}



 notifyCandidateByEmail(email: string): Observable<string> {
  // Construisez l'URL en incluant l'e-mail du candidat correctement
  const notifyUrl = `${this.apiUrl}/${email}/notify`;
  return this.http.get<string>(notifyUrl);
}


 ajouterCandidatAOffre(idCandidat: number, idOffre: number): Observable<any> {
  const url = `${this.baseUrl}/ajouterCandidatAOffre?idCandidat=${idCandidat}&idOffre=${idOffre}`;
  return this.http.post<any>(url, {});
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

