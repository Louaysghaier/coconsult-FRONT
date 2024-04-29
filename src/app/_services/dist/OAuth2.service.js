"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OAuth2RedirectService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var headers = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
var OAuth2RedirectService = /** @class */ (function () {
    function OAuth2RedirectService(http) {
        this.http = http;
        this.oauthURL = 'http://localhost:8082/oauth2/';
        this.googleurl = 'http://localhost:8082/google';
    }
    OAuth2RedirectService.prototype.google = function (tokenDto) {
        return this.http.post(this.googleurl, tokenDto, headers);
    };
    OAuth2RedirectService.prototype.facebook = function (tokenDto) {
        return this.http.post(this.oauthURL + 'facebook', tokenDto, headers);
    };
    OAuth2RedirectService.prototype.handleOAuth2SuccessRedirect = function () {
        this.http.get(this.oauthURL + 'success').pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error); })).subscribe(function (response) {
            window.location.href = response.redirectUrl;
        });
    };
    OAuth2RedirectService.prototype.handleOAuth2FailureRedirect = function () {
        this.http.get(this.oauthURL + 'failure').pipe(operators_1.catchError(function (error) { return rxjs_1.throwError(error); })).subscribe(function (response) {
            window.location.href = response.redirectUrl;
        });
    };
    OAuth2RedirectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OAuth2RedirectService);
    return OAuth2RedirectService;
}());
exports.OAuth2RedirectService = OAuth2RedirectService;
