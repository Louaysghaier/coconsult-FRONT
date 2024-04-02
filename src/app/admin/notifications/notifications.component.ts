import { Component, OnInit } from '@angular/core';
import {notificationService} from './notificationService';
import { Message } from './message';

declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  message:Message[];
  constructor(private notificationService :notificationService ) { }

  showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);
const mg=this.getMessage;
      $.notify({
          icon: "notifications",
          message: this.message

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
  ngOnInit() {
    this.getMessage();
  }

  private getMessage(){
    this.notificationService.getListMessage().subscribe(data => {
    this.message = data;
    });
    }
    public sendnotif(Message: Message){
      this.notificationService.sendNotification(Message).subscribe( data =>{
        console.log(data);
        alert("message sent successfully");
        this.getMessage();
      },
      error => console.log(error));
    }
}
