import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from './salary.service';

@Component({
    selector: 'app-display-salaries',
    templateUrl: './display-salaries.component.html'
  })

  export class DisplaySalariesComponent implements OnInit {
    users: any[];
  selectedUserId: number;
  selectedUser: any;
  salaries: any[];
  constructor(private salaryService: SalaryService) { }
  ngOnInit(): void {
   
  }

}