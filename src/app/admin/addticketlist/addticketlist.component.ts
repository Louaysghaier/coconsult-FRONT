import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../_models/user';
import { TicketPriority, TicketStatus, Tickets } from 'src/app/_models/Tickets';
import { TicketService } from 'src/app/_services/tickets.service';
import { UserlistService } from '../table-list/userlist.service';

@Component({
  selector: 'app-addticketlist',
  templateUrl: './addticketlist.component.html',
  styleUrls: ['./addticketlist.component.css']
})
export class AddTicketlistComponent implements OnInit {
  ticketForm!: FormGroup;
  ticketis: Tickets[] = [];
  newTicket: Tickets = new Tickets(); 
  ticketStatus: string[] = Object.values(TicketStatus)
  ticketPriority: string[] = Object.values(TicketPriority);
  users: User[] = [];
  ticketAdded: EventEmitter<Tickets> = new EventEmitter<Tickets>();

  constructor(
    private ticketService: TicketService,
    private userService: UserlistService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddTicketlistComponent>
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      ticketPriority: ['', Validators.required],
      ticketContent: ['', Validators.required],
      tickettitle: ['', Validators.required],
      dateAssigned: [new Date(), Validators.required], // Générer automatiquement la date courante
      ticketStatus: ['', Validators.required],
      username: ['', Validators.required]
    });

    this.loadUsers();
  }

  // Méthode pour charger la liste des utilisateurs
  loadUsers() {
    this.userService.getUserList().subscribe(users => {
      this.users = users;
    });
  }

  // Méthode pour ajouter un ticket
  addTicket() {
    const ticketPriority = this.ticketForm.value.ticketPriority;
    const ticketContent = this.ticketForm.value.ticketContent;
    const tickettitle = this.ticketForm.value.tickettitle;
    const dateAssigned = this.ticketForm.value.dateAssigned;
    const ticketStatus = this.ticketForm.value.ticketStatus;
    const username = this.ticketForm.value.username;

    const newTicket = new Tickets();
    newTicket.ticketPriority = ticketPriority;
    newTicket.ticketContent = ticketContent;
    newTicket.tickettitle = tickettitle;
    newTicket.dateAssigned = dateAssigned; // Utiliser la date assignée générée automatiquement
    newTicket.ticketStatus = ticketStatus;

    // Appeler le service pour ajouter le ticket
    this.ticketService.addTicketAndAssignUser(newTicket, username).subscribe(ticket => {
        this.ticketis.push(ticket);
        this.router.navigate(['//admin/ticketlist']);
        this.dialogRef.close(this.newTicket);
        this.ticketAdded.emit(this.newTicket);
    });
  }
  

  // Méthode pour annuler l'ajout de ticket
  onCancel() {
    this.dialogRef.close();
  }
}
