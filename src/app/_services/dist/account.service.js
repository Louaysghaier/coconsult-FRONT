"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var AccountService = /** @class */ (function () {
    function AccountService(router, http) {
        this.router = router;
        this.http = http;
        this.isconn = false;
        this.userSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    Object.defineProperty(AccountService.prototype, "userValue", {
        get: function () {
            return this.userSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    AccountService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(environment_1.environment.apiUrl + "/api/auth/signIn", { email: email, password: password })
            .pipe(operators_1.map(function (user) {
            // const token = response.accessToken; 
            //        if (rememberMe) {
            // localStorage.setItem('access_token', token);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // sessionStorage.setItem('userid',user);
            console.error(user);
            _this.userSubject.next(user);
            _this.isconn = true;
            return user;
        }));
    };
    AccountService.prototype.getIsConnected = function () {
        return this.userValue != null;
    };
    AccountService.prototype.logout = function () {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    };
    AccountService.prototype.register = function (user, roleName) {
        return this.http.post(environment_1.environment.apiUrl + "/api/auth/signup/employee/" + roleName, user);
    };
    AccountService.prototype.getAll = function () {
        return this.http.get(environment_1.environment.apiUrl + "/users");
    };
    AccountService.prototype.getById = function (id) {
        return this.http.get(environment_1.environment.apiUrl + "/users/" + id);
    };
    AccountService.prototype.getCurrentUser = function () {
        return this.user;
    };
    AccountService.prototype.update = function (id, params) {
        var _this = this;
        return this.http.put(environment_1.environment.apiUrl + "/users/" + id, params)
            .pipe(operators_1.map(function (x) {
            var _a, _b;
            // update stored user if the logged in user updated their own record
            if (id.toString() === ((_b = (_a = _this.userValue) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString())) {
                // update local storage
                var user = __assign(__assign({}, _this.userValue), params);
                localStorage.setItem('user', JSON.stringify(user));
                // publish updated user to subscribers
                _this.userSubject.next(user);
            }
            return x;
        }));
    };
    AccountService.prototype["delete"] = function (id) {
        var _this = this;
        return this.http["delete"](environment_1.environment.apiUrl + "/users/" + id)
            .pipe(operators_1.map(function (x) {
            var _a, _b;
            // auto logout if the logged in user deleted their own record
            if (id.toString() === ((_b = (_a = _this.userValue) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString())) {
                _this.logout();
            }
            return x;
        }));
    };
    AccountService.prototype.getAuthToken = function () {
        var token = localStorage.getItem('access_token');
        console.log('SERVICE token is' + token);
        return token || 'EMPTY';
    };
    AccountService.prototype.forgetPassword = function (username, resetPass) {
        return this.http.put(environment_1.environment.apiUrl + "/api/user/forgetpass/" + username, resetPass);
    };
    AccountService.prototype.userForgetPassword = function (email) {
        return this.http.post(environment_1.environment.apiUrl + "/api/user/forgetpassword/" + email, null);
    };
    AccountService.prototype.forgetPasswordbyemail = function (email, resetPass) {
        return this.http.put(environment_1.environment.apiUrl + "/api/user/forgetpassbyemail/" + email, resetPass);
    };
    AccountService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
