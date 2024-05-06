import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Room } from 'src/app/_models/Room';
import { AddRoomConfigurationComponent } from 'src/app/admin/add-room-configuration/add-room-configuration.component';
import { RoomService } from 'src/app/_services/room-configuration.service';


@Component({
  selector: 'app-room-configuration',
  templateUrl: './room-configuration.component.html',
  styleUrls: ['./room-configuration.component.css']
})
export class RoomConfigurationComponent implements OnDestroy {
  rooms: Room[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  currentPage: number = 0;
  pagedRooms: Room[] = [];

  constructor(
    private roomService: RoomService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.updatePage();
    });
  }

  updatePage() {
    const filteredRooms = this.filterRooms();
    const startIndex = this.currentPage * this.pageSize;
    this.pagedRooms = filteredRooms.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  filterRooms(): Room[] {
    return this.rooms.filter(room =>
      room.idRoom.toString().includes(this.searchTerm) ||
      room.tiltle.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // Si vous avez d'autres champs à filtrer, ajoutez-les ici
    );
  }

  deleteRoom(roomId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette salle ?")) {
      this.roomService.deleteRoomById(roomId).subscribe(() => {
        // Rechargez la liste des salles après la suppression avec succès
        this.loadRooms();
      });
    }
  }

  

  openAddRoomDialog() {
    this.dialog.open(AddRoomConfigurationComponent, {
      width: '50%',
    });
  }
}
