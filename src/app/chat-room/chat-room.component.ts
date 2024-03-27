import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../_services/WebSocket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  messages: any[] = [];
  messageInput: string = '';

  constructor(private webSocketService: WebSocketService) { }

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

  sendMessage() {
    if (this.messageInput.trim() !== '') {
      this.webSocketService.sendMessage({ content: this.messageInput });
      this.messageInput = ''; // Clear input field after sending message
    }
  }
}
