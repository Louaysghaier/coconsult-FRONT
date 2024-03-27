import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { error } from 'console';
import { User } from 'src/app/_models';
import { GroupChat } from 'src/app/_models/GroupChat';
import { RoleName } from 'src/app/_models/Role';
//import { ChatRoomService } from 'src/app/_services/ChatRoom.service';
import { GroupChatservice } from 'src/app/_services/GroupChat.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent {
  GPCHAT: GroupChat[] = [];
  HRGPCHAT: GroupChat[] = [];
  PMGPCHAT: GroupChat[] = [];
  CRMGPCHAT: GroupChat[] = [];
  EmployeeGPCHAT: GroupChat[] = [];
  ManagerGPCHAT: GroupChat[] = [];
  ConsultGPCHAT: GroupChat[] = [];
  roleOptions: string[] = Object.values(RoleName);
  usersOptions: User[] = [];
  constructor(private groupChatService: GroupChatservice) {}

  ngOnInit(): void {
    this.loadGPCHAT();
    this.loadAvailableUsers();
  }
  loadAvailableUsers(): void {

    this.groupChatService.getAvailableUsers().subscribe((data: User[]) => {
      this.usersOptions= data;
      console.log(data);
    } , error => { 
      console.error('An error occurred while loading available users:', error);
    });
  }

  loadGPCHAT(): void {
    this.groupChatService.getAllGroupChats().subscribe((data: GroupChat[]) => {
      this.GPCHAT = data;

      this.HRGPCHAT = this.GPCHAT.filter(chat => chat.groupTitle === 'HR');
      this.PMGPCHAT = this.GPCHAT.filter(chat => chat.groupTitle === 'PM');
      this.CRMGPCHAT = this.GPCHAT.filter(chat => chat.groupTitle === 'CRM');
      this.ManagerGPCHAT = this.GPCHAT.filter(chat => chat.groupTitle === 'Manager');
      this.ConsultGPCHAT = this.GPCHAT.filter(chat => chat.groupTitle === 'Consult');
      this.EmployeeGPCHAT = this.GPCHAT.filter(chat => chat.groupTitle === 'Employee');
    });
  }

  refreshData(): void {
    this.loadGPCHAT();
  }

  groupChatForm = new FormGroup({
    groupTitle: new FormControl(''),
    rules: new FormControl(''),
    role: new FormControl(RoleName.ROLE_USER),
    users: new FormControl([])
  });

  saveGroupChat(): void {
    if (this.groupChatForm.valid) {
      const newGroupChat: GroupChat = {
        groupTitle: this.groupChatForm.get('groupTitle')?.value,
        rules: this.groupChatForm.get('rules')?.value,
        role: {
          RoleName: this.groupChatForm.get('role')?.value
        },
       // users: this.groupChatForm.get('users')?.value
      };

      this.groupChatService.createGroupChat(newGroupChat).subscribe(
        () => {
          console.log('Group chat saved successfully');
          this.loadGPCHAT(); // Refresh data after saving
        },
        error => {
          console.error('An error occurred while saving group chat:', error);
        }
      );
    }
  }
}
