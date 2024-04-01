import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz } from './_models/quiz';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {
  conservation = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:8082/jobopports'; 

  messageMap = {
    "hi": "hello",
    "hello": "hi",
    "who are you": "my name is testcode ai",
    "what is angular": "angular is the best framework",
    "tell me about job opportunities": "Here are some available job opportunities:",
    "job opportunities": "you can just click on the button for detail Here are some available job opportunities:",
    "job": "Here are some available job opportunities:",
    "quiz":"Here Some quiz that we have ",
    "je t'aime":"jaime que dorra",
    "can you help me ":"yes of course "

  };

  async getBostAnswer(msg: string): Promise<void> {
    const userMessage = new Message('user', msg);
    this.conservation.next([userMessage]);

    const botMessageContent = await this.getBotMessage(msg);
    const botMessage = new Message('bot', botMessageContent);
    setTimeout(() => {
      this.conservation.next([botMessage]);
    }, 1500);
  }

  private async getBotMessage(question: string): Promise<string> {
    let answer = this.messageMap[question];
    if (!answer) {
      if (question.toLowerCase().includes('job opportunities')||question.toLowerCase().includes('job ')) {
        try {
          const jobOpportunities = await this.getAllJobOpports().toPromise();
          answer = this.formatJobOpportunities(jobOpportunities);
        } catch (error) {
          console.error("Error fetching job opportunities:", error);
          answer = "Sorry, there was an error fetching job opportunities.";
        }
      } else if(question.toLowerCase().includes('quiz')) {
        try{
          const quiz=await this.getAllQuizzes().toPromise();
          answer = this.formatquiz(quiz);
        } catch (error) {
          console.error("Error fetching job opportunities:", error);
          answer = "Sorry, there was an error fetching job opportunities.";
        }
 
      } else {
        answer = "Sorry, I didn't understand that.";
      }
    }
    return answer;
  }
private formatquiz (quiz:any[]):string{
  let formattedString = "Here Some quiz that we have:\n";
  quiz.forEach(opport => {
    formattedString += `Title: ${opport.titre}\n`;
    formattedString += `numberOfQuestions: ${opport.numberOfQuestions}\n`;
   
  
  });
  return formattedString;
}

  private formatJobOpportunities(jobOpportunities: any[]): string {
    let formattedString = "Here are some available job opportunities:\n";
    jobOpportunities.forEach(opport => {
      formattedString += `Title: ${opport.titre}\n`;
      formattedString += `Description: ${opport.description}\n`;
      formattedString += `Qualifications: ${opport.qualifications}\n`;
      formattedString += `Location: ${opport.lieu}\n`;
      formattedString += `Deadline: ${opport.dateLimite}\n\n`;
    });
    return formattedString;
  }

  private getAllJobOpports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getalljob`).pipe(
      catchError(error => {
        throw 'Error in retrieving job opportunities';
      })
    );
  }
  apiUrl = 'http://localhost:8082/quizzes/'; 

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl + 'getallquizzes');
  }

}
