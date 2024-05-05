import { Component } from '@angular/core';
import { DemandeService } from './demande.service';


@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddAskComponent {
  duration: number;
  startDate: string;
  userId: number;
  type: string;
  certificateFile: File;

  constructor(private askService: DemandeService ) { 
  
  }

  submitForm() {
    const formData = new FormData();
    formData.append('duration', this.duration.toString());
    formData.append('startDate', this.startDate);
    formData.append('user', this.userId.toString());
    formData.append('type', this.type);
    formData.append('certificateFile', this.certificateFile);

    this.askService.addAsk(formData).subscribe(
      response => {
        console.log('Ask added successfully:', response);
        // Optionally, perform any additional actions after adding the ask
        this.resetForm();
      },
      error => {
        console.error('Error adding ask:', error);
      }
    );
  }

  resetForm() {
    this.duration = null;
    this.startDate = null;
    this.userId = null;
    this.type = null;
    this.certificateFile = null;
  }

  onFileSelected(event: any) {
    this.certificateFile = event.target.files[0];
  }
}
