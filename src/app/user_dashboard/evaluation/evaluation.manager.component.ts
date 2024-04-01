// evaluation.manager.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { EvaluationService } from './evaluation.service';

@Component({
  selector: 'app-evaluation-manager',
  templateUrl: './evaluation.manager.component.html'
})
export class EvaluationManagerComponent implements OnInit {
  users: any[]; // Array to store the list of users
  selectedUser: number;
  evaluationRange: number;
  description: string;
  evaluatorType: string;
  criteria1: number;
  criteria2: number;
  criteria3: number;

  constructor(private userService: UserService, private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.fetchUsers(); // Fetch the list of users when the component initializes
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  submitForm() {
    if (!this.selectedUser || !this.description || !this.evaluatorType) {
      console.log('Please fill out all fields');
      return;
    }

    const totalCriteria = 3;
    const totalEvaluationRange = this.evaluationRange + this.criteria1 + this.criteria2 + this.criteria3;
    const moy = totalEvaluationRange / (totalCriteria + 1); // Including the main evaluation range
    const evaluationData = {
      type: this.evaluatorType,
      moy: moy,
      feedBack: this.description,
      user: {
        id: this.selectedUser.toString()
      }
    };

    this.evaluationService.addEvaluation(evaluationData).subscribe(
      (response: any) => {
        console.log('Evaluation added successfully:', response);
        // Reset form fields
        this.selectedUser = null;
        this.evaluationRange = null;
        this.description = '';
        this.evaluatorType = '';
        this.criteria1 = null;
        this.criteria2 = null;
        this.criteria3 = null;
      },
      error => {
        console.error('Error adding evaluation:', error);
      }
    );
  }
}
