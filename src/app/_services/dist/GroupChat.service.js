"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupChatservice = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var sweetalert2_1 = require("sweetalert2");
var GroupChatservice = /** @class */ (function () {
    function GroupChatservice(router, http) {
        this.router = router;
        this.http = http;
        this.apiUrl = 'http://localhost:8082/api/GroupChat'; // replace with your API URL
    }
    GroupChatservice.prototype.createGroupChat = function (groupChat) {
        return this.http.post(this.apiUrl + "/createGP", groupChat)
            .pipe(rxjs_1.catchError(function (error) {
            var errorMessage = error.error.message || 'An error occurred while saving group chat. Please try again later.';
            sweetalert2_1["default"].fire({ icon: 'error', title: 'Oops...', text: errorMessage });
            return rxjs_1.throwError(errorMessage);
        }));
    };
    GroupChatservice.prototype.addUserToGroupChatByRole = function (IdGroupChat, IdUser) {
        return this.http.put(this.apiUrl + "/addUserToGroupChatByRole/" + IdGroupChat + "/" + IdUser, null);
    };
    GroupChatservice.prototype.removeUserFromGroupChat = function (groupChat, user) {
        return this.http["delete"](this.apiUrl + "/removeUserFromGroupChat", { body: { groupChat: groupChat, user: user } });
    };
    GroupChatservice.prototype.updateGroupChat = function (groupId, groupTitle, rules) {
        return this.http.post(this.apiUrl + "/updateGroupChat/" + groupId + "/" + groupTitle + "/" + rules, null);
    };
    /*updateGroupChat(groupChat: GroupChat): Observable<GroupChat>{
        return this.http.post<GroupChat>(`${this.apiUrl}/updateGroupChat`, groupChat);
    }*/
    GroupChatservice.prototype.getAllGroupChatsByRole = function (roleName) {
        return this.http.get(this.apiUrl + "/getAllGroupChatsByRole/" + roleName);
    };
    GroupChatservice.prototype.getAllGroupChats = function () {
        return this.http.get(this.apiUrl + "/getAllGroupChats");
    };
    GroupChatservice.prototype.getGroupChatById = function (groupId) {
        return this.http.get(this.apiUrl + "/getGroupChatById/" + groupId);
    };
    GroupChatservice.prototype.bannedUser = function (bannedUser) {
        return this.http.post(this.apiUrl + "/banneduser/" + bannedUser, null);
    };
    GroupChatservice.prototype.deleteGroupChat = function (groupId) {
        return this.http["delete"](this.apiUrl + "/deleteGroupChat/" + groupId);
    };
    GroupChatservice.prototype.removeBan = function (idUser) {
        return this.http.post(this.apiUrl + "/removeban/" + idUser, null);
    };
    GroupChatservice.prototype.getAvailableUsers = function () {
        return this.http.get(this.apiUrl + "/getavailableusers");
    };
    GroupChatservice = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], GroupChatservice);
    return GroupChatservice;
}());
exports.GroupChatservice = GroupChatservice;
