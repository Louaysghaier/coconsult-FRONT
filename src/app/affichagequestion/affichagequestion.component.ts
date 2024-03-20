import { Component, EventEmitter, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



import { Question } from '../_models/question';
import { QuestionService } from '../_services/question.service';
import { CandidatService } from '../_services/candidat.service';
import { QuizService } from '../_services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { QuizRulesDialogComponent } from '../quiz-rules-dialog/quiz-rules-dialog.component';

@Component({
  selector: 'app-affichagequestion',
  templateUrl: './affichagequestion.component.html',
  styleUrls: ['./affichagequestion.component.css']
})
export class AffichagequestionComponent {

  quizId: any;
  title = null;
  quizTitle = null;
  questions: Question[] = [];
  mailcandidat: any = sessionStorage.getItem('email');
  currentQuestionIndex: number = 0;
  listofcurrentQuest: any[] = [];
  remainingTime: number = 1000; // Set the initial time for each question (in seconds)
  timer: any; 
  id_candidat: any;
  warningCount=0;

  constructor(private router: Router, private questionService: QuestionService, private quizService: QuizService, private route: ActivatedRoute,private candidatservice:CandidatService ,private dialog: MatDialog// Assurez-vous que MatDialog est correctement injecté
  ) { }

 ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = params['quizId'];
      
      this.openRulesDialog();
      this.getQuizQuestions();
     
    });
}
openRulesDialog(): void {
  const dialogRef = this.dialog.open(QuizRulesDialogComponent, {
    width: '400px', // You can adjust the width as needed
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'close') {
      this.getQuizQuestions(); // Call your method after closing the dialog
    }
  });
}




  getQuizQuestions() {
    this.questionService.getQuestionsForQuiz(this.quizId, this.mailcandidat).subscribe(
      (data) => {
        this.questions = data;
        
        this.startTimer();
        console.log(data);
      },
      (error) => {
        console.log("Error: Questions can't be loaded due to some problems. Try again!", error);
      }
    )
  }
  startTimer(): void {
    
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.moveToNextQuestion();
      }
    }, 1000);
  }


  submitAnswer(option: string): void {
   
    if (option !== undefined && this.currentQuestionIndex < this.questions.length) {
     
     
        // Call the evaluateQuiz method for the current question
      this.quizService.evaluateQuiz(this.questions[this.currentQuestionIndex].idQuest, option, this.mailcandidat).subscribe(
      (response) => {
          console.log('Quiz evaluated successfully:', response);
          // Handle the response as needed
        },
        (error) => {
          console.error('Error occurred while evaluating quiz:', error);
      
          // Handle errors
        }
      );
    
      // Move to the next question if available
      this.currentQuestionIndex++;
      window.history.pushState(null, null, window.location.href);
    } else {
      console.log('No more questions or option is undefined.');
      window.onbeforeunload = () => {
        return 'Vos progrès seront perdus si vous revenez en arrière.';
      };
    }
}
moveToNextQuestion(): void {
  clearInterval(this.timer); // Stop the timer
  this.currentQuestionIndex++;
  this.remainingTime = 10; // Reset the timer for the next question
  if (this.currentQuestionIndex < this.questions.length) {
    this.startTimer(); // Start the timer for the next question
  }
}
deleteCandidat(id: number): void {
  // Appeler le service pour supprimer le candidat de la base de données
  this.candidatservice.deleteCandidat(id).subscribe(

    (response) => {
      console.log('Candidat deleted successfully:', response);
      // Rediriger vers une page de confirmation ou autre action nécessaire
    },
    (error) => {
      console.error('Error occurred while deleting candidat:', error);
      // Gérer les erreurs
    }
  );
}
finishQuiz(): void {
  console.log('Quiz finished.');

  // Appeler la méthode notifyCandidatesWithScoreGreaterThan5() du service
  this.candidatservice.notifyCandidatesWithScoreGreaterThan5().subscribe(
    () => {
      console.log('Notification envoyée avec succès.');
      // Ici, vous pouvez effectuer des actions supplémentaires si nécessaire
    },
    (error) => {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      // Gérer les erreurs
    }
  );
}



confirmRetourQuestion(): void {
  Swal.fire({
    title: 'tu ne peut pas revenir en arriere ',
    text: 'Vos progrès seront perdus.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    
   
  
})

}
@HostListener('contextmenu', ['$event'])
onRightClick(event) {
  Swal.fire("warning","You can't right click if u will do so your exam will be cancalled!!","warning");
  this.warningCount++;
  if(this.warningCount>5){
    console.log("warning count number is:"+this.warningCount);
    //this.submitQuiz();
    Swal.fire("warning","This is your last warning now your exam gets automatically submitted!!","warning");
   
  }
event.preventDefault();
}
}
