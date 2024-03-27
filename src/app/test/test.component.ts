import { Component, OnInit } from '@angular/core';
import { ChatGptService, Message } from '../chat-gpt.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TESTComponent implements OnInit {
  messages: Message[] = [];
  inputValue: string = '';

  constructor(private chatService: ChatGptService) {
    this.chatService.conservation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  sendMessage() {
    if (this.inputValue.trim() === '') return;
    this.chatService.getBostAnswer(this.inputValue);
    this.inputValue = '';
  }
}