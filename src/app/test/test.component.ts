import { Component, OnInit } from '@angular/core';
import { ChatGptService, Message } from '../chat-gpt.service';
import { MatDialog } from '@angular/material/dialog';
import { JobOpportComponent } from '../job-opport/job-opport.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TESTComponent implements OnInit {
  messages: Message[] = [];
  inputValue: string = '';

  constructor(private router: Router,private chatService: ChatGptService, private dialog: MatDialog) {
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
  openJobOpportModal() {
 
    this.dialog.open(JobOpportComponent, {
      width: '80%', // Définissez la largeur de la fenêtre modale selon vos besoins
      height: '80%', // Définissez la hauteur de la fenêtre modale selon vos besoins
    });
  }
}
