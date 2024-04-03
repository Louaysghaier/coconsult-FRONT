import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/WebSocket.service';
import { ChatService } from '../_services/ChatRoom.service';
import { User } from '../_models';
import { GroupChatservice } from '../_services/GroupChat.service';
import { GroupChat } from '../_models/GroupChat';
import { WebSocketSubject } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
//import { Client, Message } from '@stomp/stompjs';
////import { SockJS } from 'sockjs-client';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  webSocket: WebSocketSubject<any>;
  currentuser: User;
  messages: any[] = [];
  messageInput: string = '';
  GroupChatname: string;
  GroupChat: GroupChat;
  groupChatid: number;
  constructor(private http: HttpClient, private webSocketService: WebSocketService,private GroupChatservice: GroupChatservice) {
    this.currentuser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}') as User;
  }
  findgroupchat() {
    this.GroupChatservice.getGroupChatByUser(this.currentuser.id).subscribe((data: GroupChat) => {
      this.GroupChat = data;
      this.GroupChatname = data.groupTitle;
      this.groupChatid = data.id;
     // console.log('groupchatid:', this.groupChatid);
      this.GroupChatservice.getchatpergroupchat(this.groupChatid).subscribe(
        (response) => { 
          //console.log(response);
            this.messages = response;
           // this.currentuser=response[0].sender;
          },
          (error) => {
            console.error('Error loading messages:', error);
          }
        );
     // console.log(data);
    }, error => {
      console.error('An error occurred while loading available users:', error);
    });
  }

  ngOnInit() {
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
  }

  

  sendMessage() {
    if (this.messageInput.trim() !== '') {
      // Send message to WebSocket
     /* this.webSocketService.sendMessage({
        sender: this.currentuser,
        groupChat: this.GroupChat,
        message: this.messageInput
      });*/

      // Persist message via HTTP POST
      this.http.post<any>(
        'http://localhost:8082/api/Chat/sendChat/' + this.currentuser.id + '/' + this.GroupChat.id + '/' + this.messageInput,
        {}
      ).subscribe(
        (response) => {
          this.findgroupchat();

          // Optionally handle response
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );

      // Clear message input
      this.messageInput = '';
    }
  }
  /*username: string;
  stompClient: Client;
  messageInput: string;
  messageArea: HTMLElement;
  connectingElement: HTMLElement;

  constructor() { }

  connect(event: Event): void {
    this.username = (document.querySelector('#name') as HTMLInputElement).value.trim();

    if (this.username) {
      const usernamePage = document.querySelector('#username-page') as HTMLElement;
      const chatPage = document.querySelector('#chat-page') as HTMLElement;
      usernamePage.classList.add('hidden');
      chatPage.classList.remove('hidden');

      const socket = new SockJS('/ws');
      this.stompClient = new Client();
      this.stompClient.webSocketFactory = () => socket;

      this.stompClient.onConnect = this.onConnected.bind(this);
      this.stompClient.onWebSocketError = this.onError.bind(this);

      this.stompClient.activate();
    }
    event.preventDefault();
  }

  onConnected(): void {
    this.stompClient.subscribe('/topic/public', this.onMessageReceived.bind(this));
    this.stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: this.username, type: 'JOIN' }));
    this.connectingElement.classList.add('hidden');
  }

  onError(error: Event): void {
    this.connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    this.connectingElement.style.color = 'red';
  }

  sendMessage(event: Event): void {
    const messageInput = (document.querySelector('#message') as HTMLInputElement);
    const messageContent = messageInput.value.trim();
    if (messageContent && this.stompClient) {
      const chatMessage = {
        sender: this.username,
        content: messageContent,
        type: 'CHAT'
      };
      this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      messageInput.value = '';
    }
    event.preventDefault();
  }

  onMessageReceived(payload: Message): void {
    const message = JSON.parse(payload.body);

    const messageElement = document.createElement('li');

    if (message.type === 'JOIN' || message.type === 'LEAVE') {
      messageElement.classList.add('event-message');
      message.content = `${message.sender} ${message.type === 'JOIN' ? 'joined!' : 'left!'}`;
    } else {
      messageElement.classList.add('chat-message');

      const avatarElement = document.createElement('i');
      const avatarText = document.createTextNode(message.sender[0]);
      avatarElement.appendChild(avatarText);
      avatarElement.style['background-color'] = this.getAvatarColor(message.sender);

      messageElement.appendChild(avatarElement);

      const usernameElement = document.createElement('span');
      const usernameText = document.createTextNode(message.sender);
      usernameElement.appendChild(usernameText);
      messageElement.appendChild(usernameElement);
    }

    const textElement = document.createElement('p');
    const messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    this.messageArea.appendChild(messageElement);
    this.messageArea.scrollTop = this.messageArea.scrollHeight;
  }

  getAvatarColor(messageSender: string): string {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  }*/
}
