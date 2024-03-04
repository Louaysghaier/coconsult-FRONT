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
    LoginComponent.prototype.onSubmit = function (loginForm) {
        var _this = this;
        if (loginForm.valid) {
            var email = this.user.email;
            var password = this.user.password;
            this.authService.login(email, password, this.rememberMe).subscribe(function (response) {
                console.log('User logged in successfully!');
                var token = response.jwtToken;
                if (_this.rememberMe) {
                    localStorage.setItem('access_token', token);
                }
                else {
                    sessionStorage.setItem('access_token', token);
                }
                _this.router.navigate(['calcul/work']);
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
