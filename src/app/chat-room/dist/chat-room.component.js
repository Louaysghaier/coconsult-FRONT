"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ChatRoomComponent = void 0;
var core_1 = require("@angular/core");
var Chat_1 = require("../_models/Chat");
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(chatService, GroupChatservice, accountService) {
        var _this = this;
        this.chatService = chatService;
        this.GroupChatservice = GroupChatservice;
        this.accountService = accountService;
        this.chats = [];
        this.messageContent = '';
        this.messageDisplay = [];
        this.oldChats = [];
        this.newChats = [];
        this.displayedMessages = [];
        this.messageInput = '';
        this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
        this.accountService.getuserById(this.currentuser.id).subscribe(function (data) {
            _this.myuser = data;
            console.log('myuser:', _this.myuser);
        });
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
                _this.oldChats = response;
                //  this.messages = response;
                // this.currentuser=response[0].sender;
            }, function (error) {
                console.error('Error loading messages:', error);
            });
            // console.log(data);
        }, function (error) {
            console.error('An error occurred while loading available users:', error);
        });
    };
    ChatRoomComponent.prototype.sendMessage = function () {
        if (this.messageContent.trim()) {
            // Create a Chat object with message content and sender information (if needed)
            var chatMessage = new Chat_1.Chat();
            chatMessage.message = this.messageContent;
            chatMessage.sender = this.myuser;
            chatMessage.groupChat = this.GroupChat;
            chatMessage.type = Chat_1.MessageType.SENT;
            chatMessage.date = new Date();
            var destination = '/app/chat.sendMessage'; // Match the MessageMapping in Spring Boot
            this.chatService.sendMessage(destination, chatMessage);
            this.messageContent = '';
        }
    };
    // Function to extract the message content from the raw WebSocket message
    ChatRoomComponent.prototype.extractMessageContent = function (message) {
        if (message.body) {
            return message.body.trim();
        }
        else {
            return 'test';
        }
    };
    // Function to combine old and new messages and display them in the UI
    ChatRoomComponent.prototype.displayMessages = function () {
        // Combine old and new messages
        var allChats = __spreadArrays(this.oldChats, this.newChats);
        // Sort the combined array by date or any other criteria if needed
        // Display the combined messages in the UI
        this.displayedMessages = allChats;
    };
    ChatRoomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.findgroupchat();
        this.chatService.connect('ws://localhost:8082/ws');
        // this.chatService.subscribeToGroupChatMessages(this.groupChatid);
        this.chatService.messages$.subscribe(function (result) {
            var messageContent = _this.extractMessageContent(result);
            //console.log('Received message:', message);
            _this.messageDisplay.push(messageContent);
            _this.currentChat = result;
            console.log('messageDisplay:', _this.messageDisplay);
        }, function (error) {
            console.error('Error processing message:', error);
        });
    };
    ChatRoomComponent.prototype.ngOnDestroy = function () {
        // Disconnect from STOMP server on component destruction
        if (this.chatService.stompClient) {
            this.chatService.stompClient.disconnect();
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
