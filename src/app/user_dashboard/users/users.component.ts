import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
  })

  export class UsersComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id','name', 'email']; // Add more columns as needed
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(private userService: UserService) { }
  
    ngOnInit(): void {
      this.userService.getUsers().subscribe(users => {
        this.dataSource = new MatTableDataSource<any>(users);
        this.dataSource.paginator = this.paginator;
      });
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}