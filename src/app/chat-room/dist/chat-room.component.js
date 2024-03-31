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
var _models_1 = require("../_models");
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(webSocketService, chatservice, groupchatservice) {
        this.webSocketService = webSocketService;
        this.chatservice = chatservice;
        this.groupchatservice = groupchatservice;
        this.messages = [];
        this.messageInput = '';
        // Declare the 'currentuser' variable
        this.currentuser = new _models_1.User();
        this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
        //this.idGPchat= this.getidGPchat();
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webSocketService.getMessage().subscribe(function (message) {
            _this.messages.push(message);
        }, function (error) {
            console.error('WebSocket error:', error);
        });
    };
    /*getidGPchat():number{
      this.groupchatservice.getGroupChatById(this.currentuser.iduser).subscribe(
        (data:GroupChat) => {
          console.log(data);
          this.idGPchat=data.id;
          console.log(this.idGPchat);
        },
        (error) => {
          console.log(error);
        }
      );
      return this.idGPchat;
    }*/
    ChatRoomComponent.prototype.sendmsg = function () {
        var _this = this;
        this.groupchatservice.getGroupChatById(this.currentuser.id).subscribe(function (data) {
            _this.idGPchat = data.id;
            _this.chatservice.sendChat(_this.currentuser.id, _this.idGPchat, _this.messageInput).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            });
        }, function (err) { return console.log(err); });
    };
    ChatRoomComponent.prototype.sendMessage = function () {
        if (this.messageInput.trim() !== '') {
            this.webSocketService.sendMessage({ content: this.messageInput });
            this.sendmsg();
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
