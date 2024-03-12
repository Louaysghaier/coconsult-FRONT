import { Component } from '@angular/core';
import { Quiz } from 'src/app/_models/quiz';
import { QuizService } from 'src/app/_services/quiz.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
quiz:Quiz = {
  id_quiz:0,
 
  }

constructor(private quizservice: QuizService) {}
ajouterquiz(): void {
  this.quizservice.ajouterquiz(this.quiz)
    .subscribe((response) => {
      console.log('quiz ajoutée avec succès :', response);
      // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires après l'ajout
      this.quiz = {
        id_quiz:0,

      };
    }, (error) => {
      console.error('Erreur lors de l\'ajout de la question :', error);
    });
}


}
