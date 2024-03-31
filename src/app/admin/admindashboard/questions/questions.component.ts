import { Component } from '@angular/core';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';
import { QuestionComponent } from '../question/question.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdatequestionComponent } from '../updatequestion/updatequestion.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questions: Question[] = [];
  displayedColumns: string[] = ['ponderation', 'type', 'content', 'answer','option1','option2','option3','option4','actions'];  
 

  constructor(private questionService: QuestionService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchQuestions();
  }

  fetchQuestions(): void {
    this.questionService.getAllquestion().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  ouvrirPopupAjoutQuestion(): void {
    const dialogRef = this.dialog.open(QuestionComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Rafraîchissez la liste des questions après la fermeture de la popup
      this.fetchQuestions();
    });
  }
  openUpdateDialog(question: Question): void {
    const dialogRef = this.dialog.open(UpdatequestionComponent, {
      width: '300px',
      data: { question }
    });

    dialogRef.afterClosed().subscribe(updatedQuestion => {
      if (updatedQuestion) {
        this.updateQuiz(question.idQuest, updatedQuestion); // Call updateQuiz method when dialog closes
      }
    });
  }

  updateQuiz(id: number, updatedQuestion: Question): void {
    this.questionService.updateQuestion(id, updatedQuestion).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('Quiz updated successfully:', response);
      },
      (error) => {
        // Handle error, if needed
        console.error('Error updating quiz:', error);
      }
    );
  }
  openDeleteConfirmation(question: Question): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.deleteQuestion(question.idQuest);
    }
  }

  deleteQuestion(id: number): void {
    this.questionService.deleteQuestion(id).subscribe(
      () => {
        // Quiz deleted successfully
        // Refresh the quiz list or remove the deleted quiz from the list
        this.fetchQuestions();
      },
      (error) => {
        console.error('Error deleting quiz:', error);
      }
    );
  }
}


