import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupChat } from '../_models/GroupChat';
import { RoleName } from '../_models/Role';
import { User } from '../_models';
import { Router } from 'express';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GroupChatservice {
    private apiUrl = 'http://localhost:8080/api/GroupChat'; // replace with your API URL

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}
    createGroupChat(groupChat: GroupChat) {
        return this.http.put<GroupChat>(`${this.apiUrl}/createGP`, groupChat);
    }

    addUserToGroupChatByRole(IdGroupChat: number, IdUser: number) {
        return this.http.put<void>(`${this.apiUrl}/addUserToGroupChatByRole/${IdGroupChat}/${IdUser}`, null);
    }

    removeUserFromGroupChat(groupChat: GroupChat, user: User) {
        return this.http.delete<GroupChat>(`${this.apiUrl}/removeUserFromGroupChat`, { body: { groupChat, user } });
    }
    updateGroupChat(groupId: number, groupTitle: string, rules: string) {
        return this.http.post<GroupChat>(`${this.apiUrl}/updateGroupChat/${groupId}/${groupTitle}/${rules}`, null);
    }

    getAllGroupChatsByRole(roleName: RoleName) {
        return this.http.get<GroupChat[]>(`${this.apiUrl}/getAllGroupChatsByRole/${roleName}`);
    }

    getAllGroupChats():Observable<GroupChat[]> {
        return this.http.get<GroupChat[]>(`${this.apiUrl}/getAllGroupChats`);
    }

    getGroupChatById(groupId: number) {
        return this.http.get<GroupChat>(`${this.apiUrl}/getGroupChatById/${groupId}`);
    }

    bannedUser(groupId: number, bannedUser: number) {
        return this.http.post<User>(`${this.apiUrl}/banneduser/${groupId}/${bannedUser}`, null);
    }

    deleteGroupChat(groupId: number) {
        return this.http.delete<GroupChat>(`${this.apiUrl}/deleteGroupChat/${groupId}`);
    }

    removeBan(idUser: number) {
        return this.http.post<User>(`${this.apiUrl}/removeban/${idUser}`, null);
    }

    getAvailableUsers() {
        return this.http.get<User[]>(`${this.apiUrl}/getavailableusers`);
    }
}