"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LandingComponent = void 0;
var core_1 = require("@angular/core");
var LandingComponent = /** @class */ (function () {
    function LandingComponent(MsgService, authService) {
        this.MsgService = MsgService;
        this.authService = authService;
    }
    LandingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isconn = this.authService.getIsConnected();
        console.error('isconnnnn' + this.isconn);
        this.authService.user.subscribe(function (x) { return _this.user = x; });
        console.error('user' + this.user);
        this.Message = {
            nom: "",
            email: "",
            message: "",
            tel: ""
        };
    };
    LandingComponent.prototype.saveMessage = function () {
        var _this = this;
        this.MsgService.createMessage(this.Message).subscribe(function (data) {
            console.log(data);
            alert("message sent successfully");
            _this.Message = {
                nom: "",
                email: "",
                message: "",
                tel: ""
            };
            // window.location.reload();
        }, function (error) { return console.log(error); });
    };
    LandingComponent = __decorate([
        core_1.Component({
            selector: 'app-landing',
            templateUrl: './landing.component.html',
            styleUrls: ['./landing.component.scss']
        })
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;
