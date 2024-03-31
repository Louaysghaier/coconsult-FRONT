"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationsComponent = void 0;
var core_1 = require("@angular/core");
var NotificationsComponent = /** @class */ (function () {
    function NotificationsComponent(notificationService) {
        this.notificationService = notificationService;
    }
    NotificationsComponent.prototype.showNotification = function (from, align) {
        var type = ['', 'info', 'success', 'warning', 'danger'];
        var color = Math.floor((Math.random() * 4) + 1);
        var mg = this.getMessage;
        $.notify({
            icon: "notifications",
            message: this.message
        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    };
    NotificationsComponent.prototype.ngOnInit = function () {
        this.getMessage();
    };
    NotificationsComponent.prototype.getMessage = function () {
        var _this = this;
        this.notificationService.getListMessage().subscribe(function (data) {
            _this.message = data;
        });
    };
    NotificationsComponent.prototype.sendnotif = function (Message) {
        var _this = this;
        this.notificationService.sendNotification(Message).subscribe(function (data) {
            console.log(data);
            alert("message sent successfully");
            _this.getMessage();
        }, function (error) { return console.log(error); });
    };
    NotificationsComponent.prototype.formatDate = function (timestamp) {
        // Convert the Unix timestamp to a Date object
        var date = new Date(timestamp);
        // Format the date as desired (e.g., "YYYY-MM-DD HH:mm:ss")
        var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0') + " " + date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');
        return formattedDate;
    };
    NotificationsComponent = __decorate([
        core_1.Component({
            selector: 'app-notifications',
            templateUrl: './notifications.component.html',
            styleUrls: ['./notifications.component.css']
        })
    ], NotificationsComponent);
    return NotificationsComponent;
}());
exports.NotificationsComponent = NotificationsComponent;
