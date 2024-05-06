import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Room } from 'src/app/_models/Room';
import { RoomService } from 'src/app/_services/room-configuration.service';

@Component({
  selector: 'app-add-room-configuration',
  templateUrl: './add-room-configuration.component.html',
  styleUrls: ['./add-room-configuration.component.css']
})
export class AddRoomConfigurationComponent implements OnInit {
  roomForm!: FormGroup;
  roomAdded: EventEmitter<Room> = new EventEmitter<Room>();

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddRoomConfigurationComponent>
  ) {}

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      title: ['', Validators.required],
      roomDate: ['', Validators.required] // Assurez-vous que cela correspond à votre modèle Room
      // Ajoutez d'autres champs si nécessaire
    });
  }

  addRoom() {
    if (this.roomForm.valid) {
      const tiltle = this.roomForm.value.title;
      const roomDate = this.roomForm.value.roomDate;
  
      const newRoom: Room = {
        tiltle: tiltle,
        roomDate: roomDate
        // Pas besoin de spécifier idRoom ici
      };
  
      this.roomService.addRoom(newRoom).subscribe(room => {
        this.roomAdded.emit(room);
        this.dialogRef.close(room);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
