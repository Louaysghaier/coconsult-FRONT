"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatRoomComponent = void 0;
var core_1 = require("@angular/core");
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(webSocketService) {
        this.webSocketService = webSocketService;
        this.messages = [];
        this.messageInput = '';
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webSocketService.getMessage().subscribe(function (message) {
            _this.messages.push(message);
        }, function (error) {
            console.error('WebSocket error:', error);
        });
    };
    ChatRoomComponent.prototype.sendMessage = function () {
        if (this.messageInput.trim() !== '') {
            this.webSocketService.sendMessage({ content: this.messageInput });
            this.messageInput = ''; // Clear input field after sending message
        }
    };
    ChatRoomComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-room',
            templateUrl: './chat-room.component.html',
            styleUrls: ['./chat-room.component.css']
        })
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());
exports.ChatRoomComponent = ChatRoomComponent;
