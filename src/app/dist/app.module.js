"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var signup_component_1 = require("./signup/signup.component");
var landing_component_1 = require("./landing/landing.component");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var footer_component_1 = require("./shared/footer/footer.component");
var login_component_1 = require("./login/login.component");
var carousel_1 = require("ngx-bootstrap/carousel");
var dashboard_module_1 = require("./user_dashboard/dashboard.module");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var admin_layout_module_1 = require("./admin/admin-layout.module");
var signupentreprise_component_1 = require("./signupentreprise/signupentreprise.component");
var app_routing_1 = require("./app.routing");
var validation_component_1 = require("./validation/validation.component");
var ng_otp_input_1 = require("ng-otp-input");
var aboutus_component_1 = require("./shared/aboutus/aboutus.component");
var contact_component_1 = require("./shared/contact/contact.component");
var about_directive_1 = require("./shared/aboutus/about.directive");
var _helpers_1 = require("./_helpers");
var ngx_captcha_1 = require("ngx-captcha");
var forms_2 = require("@angular/forms");
var ng_recaptcha_1 = require("ng-recaptcha");
var environment_1 = require("src/environments/environment");
var forgetpass_component_1 = require("./forgetpass/forgetpass.component");
var loginforgetpassword_component_1 = require("./loginforgetpassword/loginforgetpassword.component");
var chat_room_component_1 = require("./chat-room/chat-room.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                signupentreprise_component_1.SignupEntrpriseComponent,
                signup_component_1.SignupComponent,
                landing_component_1.LandingComponent,
                navbar_component_1.NavbarComponent,
                footer_component_1.FooterComponent,
                login_component_1.LoginComponent,
                validation_component_1.ValidationComponent,
                aboutus_component_1.AboutusComponent,
                contact_component_1.ContactComponent,
                about_directive_1.AboutDirective,
                forgetpass_component_1.ForgetpassComponent,
                loginforgetpassword_component_1.LoginforgetpasswordComponent,
                chat_room_component_1.ChatRoomComponent,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                forms_2.ReactiveFormsModule,
                ngx_captcha_1.NgxCaptchaModule,
                ng_recaptcha_1.RecaptchaModule,
                ng_recaptcha_1.RecaptchaFormsModule,
                ng_otp_input_1.NgOtpInputModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                app_routing_1.AppRoutingModule,
                http_1.HttpClientModule,
                carousel_1.CarouselModule.forRoot(),
                angular_fontawesome_1.FontAwesomeModule,
                admin_layout_module_1.AdminLayoutModule,
                dashboard_module_1.DashboardModule,
            ],
            providers: [
                {
                    provide: ng_recaptcha_1.RECAPTCHA_SETTINGS,
                    useValue: {
                        siteKey: environment_1.environment.recaptcha.siteKey,
                        size: 'normal'
                    }
                },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.JwtInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.ErrorInterceptor, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
