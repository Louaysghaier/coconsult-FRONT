import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../_models/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = 'http://localhost:8082/question/'; // Remplacez ceci par l'URL de votre API
  apiUrl1 = 'http://localhost:8082/quizzes/'; 

  constructor(private http: HttpClient) {
      
  }
  ajouterQuestionEtReponseEtAffecterQuestionQuiz(question: Question, idQuiz: number): Observable<Question> {
    const url = `${this.apiUrl}affecterquaqui/${idQuiz}`;
    return this.http.post<Question>(url, question);
  }

  ajouterquestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl + 'createquestion', question);
}
getAllquestion(): Observable<Question[]> {
  return this.http.get<Question[]>(this.apiUrl + 'getallquestion');
}

getQuestionsForQuiz(quizId: number,mailcandidat:any): Observable<Question[]> {
  return this.http.get<Question[]>(`${this.apiUrl1}questions/${quizId}/${mailcandidat}`);
}



}