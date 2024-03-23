import { Component, OnInit } from '@angular/core';
import{MsgService}from'./msg.service'
import { Message } from '../admin/notifications/message';
import { AccountService } from '../_services';
import { User } from '../_models';
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
	//images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  Message: Message;
  isconn:Boolean;
  user?: User | null;

  constructor(private MsgService :MsgService,private authService  :AccountService) { 
    


  }

  ngOnInit() {
    this.isconn=this.authService.getIsConnected()
    console.error('isconnnnn' +this.isconn)
    this.authService.user.subscribe(x => this.user = x);
    console.error('user' +this.user);
    this.Message={
    nom:"",
    email:"",
    message:"",
    tel:"",
    }
  }

  saveMessage(){
    this.MsgService.createMessage(this.Message).subscribe( data =>{
    console.log(data);
    alert("message sent successfully");
    this.Message={
      nom:"",
      email:"",
      message:"",
      tel:"",
      }
   // window.location.reload();
    },
    error => console.log(error));

    }

}
