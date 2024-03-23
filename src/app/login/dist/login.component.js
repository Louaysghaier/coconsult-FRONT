"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loginError = '';
        this.rememberMe = false;
        this.user = {
            email: '',
            password: ''
        };
    }
    LoginComponent.prototype.ngOnInit = function () { };
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
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                }
                else {
                    sessionStorage.setItem('user', JSON.stringify(response));
                    // Otherwise, store tokens in sessionStorage
                    sessionStorage.setItem('accessToken', accessToken);
                    sessionStorage.setItem('refreshToken', refreshToken);
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
                console.error('Invalid email or password. Please try again.');
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
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
