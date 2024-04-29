import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { AccountService } from '../_services';
import Swal from 'sweetalert2';
import { OAuth2RedirectService } from '../_services/OAuth2.service';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { TokenDto } from '../_models/TokenDto';
import { TokenService } from '../_services/Token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser;
  public loggedIn: boolean;
  focus;
  focus1;
  loginError: string = '';

  rememberMe : boolean = false; 
   constructor(   @Inject(SocialAuthService) private socialAuthService: SocialAuthService,
    private authService: AccountService, private router: Router,
    private oauthservice:OAuth2RedirectService,
    private tokenService: TokenService
    , private httpClient: HttpClient,
  ) { }
  TokenDto: TokenDto;
   user1: any;
   private accessToken = '';

//google login
getAccessToken(): void {
  this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
}

getGoogleCalendarData(): void {
  if (!this.accessToken) return;

  this.httpClient
    .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    })
    .subscribe((events) => {
      alert('Look at your console');
      console.log('events', events);
    });
}
refreshToken(): void {
  this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
}
  ngOnInit() {
   this.loginAlert();
    this.signInWithGoogle();

  }
  loginAlert() :void {
    Swal.fire({
      title: "Welcome,Please Read this Instructions ",
      text: "If you see Google-Login-Popup skape this alert and Join Us ! if you could not login with google account please enable third part login from your browser setting ! or try to register ",
      icon: "warning",

    });
  }
  signInWithGoogle(): void {
  this.socialAuthService.authState.subscribe((user) => {
    this.socialUser = user;
    this.tokenService.setToken(user.idToken);
    localStorage.setItem('socialuser', JSON.stringify(user));
    console.log(user);
    this.TokenDto = {
      value: user.idToken
    };
    this.authService.google(this.TokenDto).subscribe(
      res => {
        Swal.fire({
          text: "if you are a new user please complete your profile",

        });
        sessionStorage.setItem('user', JSON.stringify(res));

        // Otherwise, store tokens in sessionStorage
       // sessionStorage.setItem('accessToken', accessToken);
        //sessionStorage.setItem('refreshToken', refreshToken);
       // this.tokenService.setToken(res.value);
        //this.authService.isconn= true;
        //this.router.navigate(['/']);
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        //this.socialAuthService.signOut();
      }
    );
    this.router.navigate(['/']);
    //window.location.reload();
    this.loggedIn = (user != null);
  });};
  user = {
    email: '',
    password: ''
  };
  onRememberMeChange(): void {
    // This method is called when the value of the "Remember me" checkbox changes
    console.info('Remember me value changed:', this.rememberMe);
  }
  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const email = this.user.email;
      const password = this.user.password;
      this.authService.login(email, password).subscribe(
        (response) => {      
          console.log('User logged in successfully!');
          const accessToken = response.accessToken;
          const   refreshToken = response.refreshToken;
          
          // Check if rememberMe is true, then store tokens in localStorage
        if (this.rememberMe === true) {
          localStorage.setItem('user', JSON.stringify(response));

         // localStorage.setItem('accessToken', accessToken);
          //localStorage.setItem('refreshToken', refreshToken);
        } else {
          sessionStorage.setItem('user', JSON.stringify(response));

          // Otherwise, store tokens in sessionStorage
        //  sessionStorage.setItem('accessToken', accessToken);
          //sessionStorage.setItem('refreshToken', refreshToken);
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
             this.loginError = 'Invalid email or password. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }
  
 /* signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.oauthservice.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
          this.authService.isconn= true;
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
            //.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }
*/

}
