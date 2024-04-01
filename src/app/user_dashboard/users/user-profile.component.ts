import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
  })

  export class UserProfileComponent implements OnInit {
    userId: number;
    userProfile: any; // Define the type of user profile data
  
    constructor(private route: ActivatedRoute, private userService: UserService) { }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.userId = params['id'];
        // Fetch user profile data using user ID
        this.userService.getUserProfile(this.userId).subscribe((profile: any) => {
          this.userProfile = profile;
        });
      });
    }
  }