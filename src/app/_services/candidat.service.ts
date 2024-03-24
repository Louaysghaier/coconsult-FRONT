import { HttpClient } from '@angular/common/http';
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

 baseUrl = 'http://localhost:8082'; // Mettez l'URL de votre API Spring Boot

 notifyCandidateByEmail(email: string): Observable<string> {
  // Construisez l'URL en incluant l'e-mail du candidat correctement
  const notifyUrl = `${this.apiUrl}/${email}/notify`;
  return this.http.get<string>(notifyUrl);
}


 ajouterCandidatAOffre(idCandidat: number, idOffre: number): Observable<any> {
  const url = `${this.baseUrl}/ajouterCandidatAOffre?idCandidat=${idCandidat}&idOffre=${idOffre}`;
  return this.http.post<any>(url, {});
}

uploadAndExtract(file: File, email: string): Promise<string> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('jobOpportId', '2'); // Modifier l'ID de l'opportunité d'emploi si nécessaire
  formData.append('email', email);

  return this.http.post<string>(`${this.baseUrl}/uploadAndExtract`, formData).toPromise();
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

