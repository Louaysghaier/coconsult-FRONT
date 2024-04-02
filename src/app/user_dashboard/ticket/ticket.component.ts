import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tickets } from 'src/app/_models/Tickets';
import { TicketService } from 'src/app/_services/tickets.service';
import { AddticketComponent } from '../addticket/addticket.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  tickets: Tickets[] = [];

  constructor(
    private ticketService: TicketService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  editTicket(ticketId: number) {
    // Implémentez la logique pour éditer un ticket
  }

  deleteTicket(ticketId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette Ticket?")) {
      this.ticketService.deleteTicketById(ticketId).subscribe(() => {
        this.loadTickets();
      });

    }

    }

  openAddTicket(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(AddticketComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        empcode: code
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadTickets(); // Recharger la liste des tickets après l'ajout
      }
    });
  }
  /*openAddActivity(enteranimation: any, exitanimation: any, code: any) {
    const dialogRef = this.dialog.open(AddactivityComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data: {
        empcode: code
      }
    });

    dialogRef.afterClosed().subscribe((newActivity: Activity) => {
      if (newActivity) {
        this.loadActivities(); // Recharger la liste des activités après l'ajout
      }
    });
  } */
}
