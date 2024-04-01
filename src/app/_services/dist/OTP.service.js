"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OTPSERVICE = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var OTPSERVICE = /** @class */ (function () {
    function OTPSERVICE(router, http) {
        this.router = router;
        this.http = http;
    }
    OTPSERVICE.prototype.generateOTP = function () {
        return this.http.post(environment_1.environment.apiUrl + "/OTP/GenerateOTp", {});
    };
    OTPSERVICE.prototype.verifyOTP = function (identification) {
        return this.http.post(environment_1.environment.apiUrl + "/OTP/VerifOTP/" + identification, {}).pipe(operators_1.map(function (response) {
            if (response) {
                return true;
            }
            else {
                return false;
            }
        }));
    };
    OTPSERVICE.prototype.getOTPbyId = function () { };
    OTPSERVICE.prototype.resendOTP = function (existingOTP) {
        return this.http.post(environment_1.environment.apiUrl + "/OTP/ResendOTP", existingOTP);
    };
    OTPSERVICE = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], OTPSERVICE);
    return OTPSERVICE;
}());
exports.OTPSERVICE = OTPSERVICE;
