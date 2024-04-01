import { Component } from '@angular/core';
import { QuizService } from '../_services/quiz.service';
import { Router } from '@angular/router';
import { CandidatService } from '../_services/candidat.service';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from '../_models/quiz';
import Swal from 'sweetalert2'; // Importez SweetAlert2
@Component({
  selector: 'app-myquiz',
  templateUrl: './myquiz.component.html',
  styleUrls: ['./myquiz.component.css']
})
export class MyquizComponent {
  quizzes: Quiz[]=[];
  quizInProgress = false;
  constructor(private quizService: QuizService, private router: Router,private candidatservice:CandidatService) {}
  mailcandidat:any=  sessionStorage.getItem('email');
 

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getRandomQuiz()
      .subscribe(
        (quiz: Quiz) => {
          this.quizzes.push(quiz); // Utilisez push pour ajouter le quiz au tableau de quizzes
          console.log('Random quiz loaded:', quiz);
        },
        (error) => {
          console.error('Erreur lors du chargement du quiz aléatoire :', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur est survenue lors du chargement du quiz aléatoire. Veuillez réessayer plus tard.',
          });
        }
      );
  }
  viewQuestions(quizId: number): void {
    if (this.quizInProgress) {
      // Afficher une alerte si un quiz est déjà en cours
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'connecter vous svp!',
      });
    } else {
      // Marquer un quiz en cours et naviguer vers les questions du quiz
      this.quizInProgress = true;
    this.quizService.getQuestionsForQuiz(quizId)
      .subscribe(
        (questions) => {
          console.log("mes question sont",questions);
         this.router.navigate(['Affichagequestion', quizId,this.mailcandidat]);
          
        },
        (error) => {
          console.error('Erreur lors du chargement des questions du quiz :', error);
        }
      );
  }

  
  }}