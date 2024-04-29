"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var angularx_social_login_1 = require("@abacritt/angularx-social-login");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(socialAuthService, authService, router, oauthservice, tokenService, httpClient) {
        this.socialAuthService = socialAuthService;
        this.authService = authService;
        this.router = router;
        this.oauthservice = oauthservice;
        this.tokenService = tokenService;
        this.httpClient = httpClient;
        this.loginError = '';
        this.rememberMe = false;
        this.accessToken = '';
        this.user = {
            email: '',
            password: ''
        };
    }
    //google login
    LoginComponent.prototype.getAccessToken = function () {
        var _this = this;
        this.socialAuthService.getAccessToken(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID).then(function (accessToken) { return _this.accessToken = accessToken; });
    };
    LoginComponent.prototype.getGoogleCalendarData = function () {
        if (!this.accessToken)
            return;
        this.httpClient
            .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            headers: { Authorization: "Bearer " + this.accessToken }
        })
            .subscribe(function (events) {
            alert('Look at your console');
            console.log('events', events);
        });
    };
    LoginComponent.prototype.refreshToken = function () {
        this.socialAuthService.refreshAuthToken(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.loginAlert();
        this.signInWithGoogle();
    };
    LoginComponent.prototype.loginAlert = function () {
        sweetalert2_1["default"].fire({
            title: "Welcome,Please Read this Instructions ",
            text: "If you see Google-Login-Popup skape this alert and Join Us ! if you could not login with google account please enable third part login from your browser setting ! or try to register ",
            icon: "warning"
        });
    };
    LoginComponent.prototype.signInWithGoogle = function () {
        var _this = this;
        this.socialAuthService.authState.subscribe(function (user) {
            _this.socialUser = user;
            _this.tokenService.setToken(user.idToken);
            localStorage.setItem('socialuser', JSON.stringify(user));
            console.log(user);
            _this.TokenDto = {
                value: user.idToken
            };
            _this.authService.google(_this.TokenDto).subscribe(function (res) {
                sweetalert2_1["default"].fire({
                    text: "if you are a new user please complete your profile"
                });
                sessionStorage.setItem('user', JSON.stringify(res));
                // Otherwise, store tokens in sessionStorage
                // sessionStorage.setItem('accessToken', accessToken);
                //sessionStorage.setItem('refreshToken', refreshToken);
                // this.tokenService.setToken(res.value);
                //this.authService.isconn= true;
                //this.router.navigate(['/']);
            }, function (err) {
                console.log(err);
                sweetalert2_1["default"].fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
                //this.socialAuthService.signOut();
            });
            _this.router.navigate(['/']);
            //window.location.reload();
            _this.loggedIn = (user != null);
        });
    };
    ;
    LoginComponent.prototype.onRememberMeChange = function () {
        // This method is called when the value of the "Remember me" checkbox changes
        console.info('Remember me value changed:', this.rememberMe);
    };
    LoginComponent.prototype.onSubmit = function (loginForm) {
        var _this = this;
        if (loginForm.valid) {
            var email = this.user.email;
            var password = this.user.password;
            this.authService.login(email, password).subscribe(function (response) {
                console.log('User logged in successfully!');
                var accessToken = response.accessToken;
                var refreshToken = response.refreshToken;
                // Check if rememberMe is true, then store tokens in localStorage
                if (_this.rememberMe === true) {
                    localStorage.setItem('user', JSON.stringify(response));
                    // localStorage.setItem('accessToken', accessToken);
                    //localStorage.setItem('refreshToken', refreshToken);
                }
                else {
                    sessionStorage.setItem('user', JSON.stringify(response));
                    // Otherwise, store tokens in sessionStorage
                    //  sessionStorage.setItem('accessToken', accessToken);
                    //sessionStorage.setItem('refreshToken', refreshToken);
                }
                var userAuthorities = response.authorities.map(function (authority) { return authority.authority; });
                if (userAuthorities.includes("Entreprise")) {
                    _this.router.navigate(['entreprise_dashboard']);
                }
                else if (userAuthorities.includes("USER")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("Employee")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("Manager")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("HR")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("CRM")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("PM")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("Consult")) {
                    _this.router.navigate(['user_dashboard']);
                }
                else if (userAuthorities.includes("ADMIN")) {
                    _this.router.navigate(['admin']);
                }
            }, function (error) {
                sweetalert2_1["default"].fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
                _this.loginError = 'Invalid email or password. Please try again.';
            });
        }
        else {
            console.log('Form is invalid. Please check your inputs.');
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __param(0, core_1.Inject(angularx_social_login_1.SocialAuthService))
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
