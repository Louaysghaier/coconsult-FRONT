import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointageService } from './pointage.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  isCameraOn = false;
  stream: MediaStream;
  selectedUser: number;
  users: any[] = []; // Initialize as empty array

  constructor(
    private pointageService: PointageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Fetch users when the component initializes
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  toggleCamera() {
    if (!this.isCameraOn) {
      this.startCamera();
    } else {
      this.stopCamera();
    }
  }

  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoPlayer.nativeElement.srcObject = this.stream;
      this.isCameraOn = true;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.isCameraOn = false;
    }
  }

  recordPointage() {
    // Call the appropriate method from the PointageService to record the pointage
    if (!this.selectedUser) {
      console.log('Please select a user');
      return;
    }
  
    const userData = { user: { id: this.selectedUser } };
  
    this.pointageService.recordPointage(userData).subscribe(
      (response) => {
        console.log('Pointage recorded successfully:', response);
        alert('Pointage recorded successfully');
        // Optionally, perform any additional actions after recording the pointage
      },
      (error) => {
        console.error('Error recording pointage:', error);
        alert('Error recording pointage');
      }
    );
  }
  
}
