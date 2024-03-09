"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CapatchaComponent = void 0;
var core_1 = require("@angular/core");
var CapatchaComponent = /** @class */ (function () {
    function CapatchaComponent() {
        this.token = undefined;
    }
    CapatchaComponent.prototype.send = function (form) {
        if (form.invalid) {
            for (var _i = 0, _a = Object.keys(form.controls); _i < _a.length; _i++) {
                var control = _a[_i];
                form.controls[control].markAsTouched();
            }
            console.warn("masarchay");
            return;
        }
        console.debug("Token [" + this.token + "] generated");
        console.error(this.token);
    };
    CapatchaComponent = __decorate([
        core_1.Component({
            selector: 'app-capatcha',
            templateUrl: './capatcha.component.html',
            styleUrls: ['./capatcha.component.css']
        })
    ], CapatchaComponent);
    return CapatchaComponent;
}());
exports.CapatchaComponent = CapatchaComponent;
