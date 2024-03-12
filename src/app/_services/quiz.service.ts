import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../_models/question';
import { Quiz } from '../_models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiUrl = 'http://localhost:8082/quizzes/'; 
  apiUrl1=' http://localhost:8082/evaluatequiz/'
  constructor(private http: HttpClient) {
    
  }

    ajouterquiz(quiz: Quiz): Observable<Quiz> {
      return this.http.post<Quiz>(this.apiUrl + 'createquiz', quiz);
      
    
  }
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + 'getallquizzes');
  }
  updateQuiz(quiz: Quiz): Observable<Quiz> {
    const url = `${this.apiUrl}updateQuiz/${quiz.id_quiz}`; // Utilisation de l'interpolation de chaîne
    return this.http.put<Quiz>(url, quiz);
  }
  getQuestionsForQuiz(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}questionsbyid/${quizId}`);
  }
  evaluateQuiz(question: any, option: string, mailcandidat: string): Observable<any> {
    
    return this.http.put<any>(`${this.apiUrl1}${question}/${option}/${mailcandidat}`,null);
  }

  
}


