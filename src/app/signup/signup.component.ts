import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services';
import { User } from '../_models/user';
import { Location } from '@angular/common';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus: boolean = false;
    focus1: boolean = false;
    focus2: boolean = false;
    agreePrivacy: boolean = false;
    
    signupError: string = '';
    
    
    constructor(private authService: AccountService, private router: Router) { }
    ngOnInit() {
      this.user = {
        name: '',
        username: '',
        email: '',
        password: '',
        adress: '',
        Role: '',
      };
    }
    user: User= {
      name: '',
      username: '',
      email: '',
      password: '',
      adress: '',
      Role: '',};
    onSubmit(signupForm: NgForm) {
        if (signupForm.valid && this.agreePrivacy) {
          const user :User = {
            name: this.user.name,
            username: this.user.username, 
            email: this.user.email,
            password: this.user.password,
            adress: this.user.adress, 
            
          };
          const roleName = this.user.Role; 

          this.authService.register(user, roleName).subscribe(
            (response) => {
              console.log('User registered successfully!');
              
              alert('check your mail account for verification !');
              this.router.navigate(['/']); 

            },
            (error) => {
              console.error('Error during registration.', error);
              alert('Error during registration. Please try again!');
              this.signupError = 'Error during registration. Please try again.';
             // window.location.reload();

            }
          );
        } else {
          console.log('Form is invalid or Privacy Policy not agreed.');
          //window.location.reload();
        }
      }
      
      
}
