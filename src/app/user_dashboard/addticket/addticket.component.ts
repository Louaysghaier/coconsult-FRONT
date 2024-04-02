import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { Tickets } from 'src/app/_models/Tickets';
import { TicketService } from 'src/app/_services/tickets.service';


@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketAdded: EventEmitter<Tickets> = new EventEmitter<Tickets>();

  constructor(
    private ticketService: TicketService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddticketComponent>
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      ticketPriority: ['', Validators.required],
      ticketContent: ['', Validators.required],
      dateAssigned: ['', Validators.required],
      ticketStatus: ['', Validators.required]
    });
  }

  addTicket() {
    const ticketPriority = this.ticketForm.value.ticketPriority;
    const ticketContent = this.ticketForm.value.ticketContent;
    const dateAssigned = this.ticketForm.value.dateAssigned;
    const ticketStatus = this.ticketForm.value.ticketStatus;

    const newTicket = new Tickets();
    newTicket.ticketPriority = ticketPriority;
    newTicket.ticketContent = ticketContent;
    newTicket.dateAssigned = dateAssigned;
    newTicket.ticketStatus = ticketStatus;

    this.ticketService.addTicket(newTicket).subscribe(ticket => {
      // Gérer la logique après l'ajout du ticket, comme la redirection vers une autre page
      this.router.navigate(['/admin/ticket']);
      this.dialogRef.close(newTicket);
      this.ticketAdded.emit(newTicket);
    });
  }

  onCancel() {
    this.dialogRef.close(); // Cette méthode ferme le dialogue sans passer de données.
  }
}
