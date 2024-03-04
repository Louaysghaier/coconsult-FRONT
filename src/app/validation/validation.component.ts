import { Component, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  constructor(private router: Router) { }

  test : Date = new Date();

  title = 'otp-app';

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }
  
  ngOnInit() {
      
  }
 
  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if (this.otp.length === this.configOptions.length )  {
      if (this.otp === 'TN1122') { 
        this.inputDigitLeft = "Let's go!";
        this.btnStatus = 'btn-primary';
        
      } else {
        this.inputDigitLeft = "Invalid OTP"; 
        this.btnStatus = 'btn-danger'; 
      }
    }
  }
  isButtonClicked = false;
  onButtonClick() {
    if (this.inputDigitLeft = "Let's go!")
    this.isButtonClicked = true;
    this.router.navigate(['/signin']); 
  }
}
