"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatService = void 0;
var core_1 = require("@angular/core");
var ChatService = /** @class */ (function () {
    function ChatService(router, http) {
        this.router = router;
        this.http = http;
        this.baseUrl = 'http://localhost:8082/api/Chat';
    }
    ChatService.prototype.sendChat = function (senderId, groupId, messageContent) {
        return this.http.post(this.baseUrl + "/sendChat/" + senderId + "/" + groupId + "/" + messageContent, {});
    };
    ChatService.prototype.getAllChatsByUser = function (userId) {
        return this.http.get(this.baseUrl + "/getAlllChatsByUser/" + userId);
    };
    ChatService.prototype.getAllChatsPerGroup = function (groupChatId) {
        return this.http.get(this.baseUrl + "/getAllchatsPerGroup/" + groupChatId);
    };
    ChatService.prototype.broadcastMessage = function (message) {
        return this.http.post(this.baseUrl + "/broadcastMSG/" + message, {});
    };
    ChatService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
