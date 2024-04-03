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
//import { Client, Message } from '@stomp/stompjs';
////import { SockJS } from 'sockjs-client';
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(http, webSocketService, GroupChatservice) {
        this.http = http;
        this.webSocketService = webSocketService;
        this.GroupChatservice = GroupChatservice;
        this.messages = [];
        this.messageInput = '';
        this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    }
    ChatRoomComponent.prototype.findgroupchat = function () {
        var _this = this;
        this.GroupChatservice.getGroupChatByUser(this.currentuser.id).subscribe(function (data) {
            _this.GroupChat = data;
            _this.GroupChatname = data.groupTitle;
            _this.groupChatid = data.id;
            // console.log('groupchatid:', this.groupChatid);
            _this.GroupChatservice.getchatpergroupchat(_this.groupChatid).subscribe(function (response) {
                //console.log(response);
                _this.messages = response;
                // this.currentuser=response[0].sender;
            }, function (error) {
                console.error('Error loading messages:', error);
            });
            // console.log(data);
        }, function (error) {
            console.error('An error occurred while loading available users:', error);
        });
    };
    ChatRoomComponent.prototype.ngOnInit = function () {
        this.findgroupchat();
        /* this.webSocketService.connect().subscribe(
           (message) => {
             console.log('Received message:', message);
             // Check if the message belongs to the current group chat
             if (message.groupChat.id === this.GroupChat.id) {
               // Push the message to the messages array
               this.messages.push(message);
             }
           },
           (err) => console.error(err),
         );
     */
    };
    ChatRoomComponent.prototype.sendMessage = function () {
        var _this = this;
        if (this.messageInput.trim() !== '') {
            // Send message to WebSocket
            /* this.webSocketService.sendMessage({
               sender: this.currentuser,
               groupChat: this.GroupChat,
               message: this.messageInput
             });*/
            // Persist message via HTTP POST
            this.http.post('http://localhost:8082/api/Chat/sendChat/' + this.currentuser.id + '/' + this.GroupChat.id + '/' + this.messageInput, {}).subscribe(function (response) {
                _this.findgroupchat();
                // Optionally handle response
            }, function (error) {
                console.error('Error sending message:', error);
            });
            // Clear message input
            this.messageInput = '';
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
