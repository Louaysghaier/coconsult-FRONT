import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/WebSocket.service';
import { ChatService } from '../_services/ChatRoom.service';
import { User } from '../_models';
import { GroupChatservice } from '../_services/GroupChat.service';
import { GroupChat } from '../_models/GroupChat';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  messages: any[] = [];
  messageInput: string = '';
// Declare the 'currentuser' variable
currentuser: User = new User();
idGPchat: number ;

  constructor(private webSocketService: WebSocketService,private chatservice:ChatService,private groupchatservice:GroupChatservice) {
    this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')!);
   //this.idGPchat= this.getidGPchat();
   }

  ngOnInit(): void {
    this.webSocketService.getMessage().subscribe(
      (message) => {
        this.messages.push(message);
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
  }
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
sendmsg(): void {
  this.groupchatservice.getGroupChatById(this.currentuser.id).subscribe(
    (data:GroupChat) => {      
      this.idGPchat=data.id;

      this.chatservice.sendChat(this.currentuser.id, this.idGPchat, this.messageInput).subscribe(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );},
  (err)=>console.log(err)
  )
}

  sendMessage() {
    if (this.messageInput.trim() !== '') {
      this.webSocketService.sendMessage({ content: this.messageInput });
      this.sendmsg();
      this.messageInput = ''; // Clear input field after sending message
    }
  }
}
