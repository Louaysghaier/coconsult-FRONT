"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var signup_component_1 = require("./signup/signup.component");
var landing_component_1 = require("./landing/landing.component");
var login_component_1 = require("./login/login.component");
var signupentreprise_component_1 = require("./signupentreprise/signupentreprise.component");
var validation_component_1 = require("./validation/validation.component");
var aboutus_component_1 = require("./shared/aboutus/aboutus.component");
var contact_component_1 = require("./shared/contact/contact.component");
var _helpers_1 = require("./_helpers");
var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./admin/admin-layout.module'); }).then(function (m) { return m.AdminLayoutModule; }); }
    },
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./user_dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); },
        canActivate: [_helpers_1.AuthGuard]
    },
    { path: 'signin', component: login_component_1.LoginComponent },
    { path: 'register', component: signup_component_1.SignupComponent },
    { path: 'signupentrprise', component: signupentreprise_component_1.SignupEntrpriseComponent },
    { path: 'verification', component: validation_component_1.ValidationComponent },
    { path: 'aboutus', component: aboutus_component_1.AboutusComponent },
    { path: 'contact', component: contact_component_1.ContactComponent },
    { path: '**', redirectTo: '', component: landing_component_1.LandingComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes, {
                    useHash: true
                }),
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
