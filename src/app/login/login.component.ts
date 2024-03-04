import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { AccountService } from '../_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  focus;
  focus1;
  loginError: string = '';
  rememberMe = false; 
   constructor(private authService: AccountService, private router: Router) { }
  
   user1: any;
  

  ngOnInit() {}
  user = {
    email: '',
    password: ''
  };
  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const email = this.user.email;
      const password = this.user.password;
      this.authService.login(email, password).subscribe(
        (response) => {      
          console.log('User logged in successfully!');
          const token = response.accessToken;
          if (this.rememberMe) {
            localStorage.setItem('access_token', token);
          } else {
            console.log("token"+token)
            sessionStorage.setItem('access_token', token);
          }
         
          const userAuthorities = response.authorities.map((authority) => authority.authority);
          
          if (userAuthorities.includes("Entreprise")) {
            this.router.navigate(['entreprise_dashboard']);
          } else if (userAuthorities.includes("USER")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("Employee")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("Manager")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("HR")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("CRM")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("PM")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("Consult")) {
            this.router.navigate(['user_dashboard']);
          } else if (userAuthorities.includes("ADMIN")) {
            this.router.navigate(['admin']); 
          }
          

        },
        (error) => {
          console.error('Invalid email or password. Please try again.');
          this.loginError = 'Invalid email or password. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }


}
