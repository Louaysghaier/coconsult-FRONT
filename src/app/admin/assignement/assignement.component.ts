import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assignements } from '../../_models/assignements';
import { AssignementsService } from '../../_services/assignements.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignement.component.html',
    styleUrls: ['./assignement.component.css']
})
export class AssignmentsComponent implements OnInit {
    assignments: Assignements[] = [];
    newAssignment: Assignements = new Assignements();
    selectedAssignment: Assignements = new Assignements();

    totalAssignments: number = 0;
    pageSize: number = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    constructor(private modalService: NgbModal, private assignmentsService: AssignementsService) { }

    ngOnInit(): void {
        this.getAllAssignments();
    }

    getAllAssignments(): void {
        this.assignmentsService.getAllAssigns().subscribe(
            (assignments: Assignements[]) => {
                this.assignments = assignments;
                this.totalAssignments = this.assignments.length;
            },
            (error: any) => {
                console.error('Error fetching assignments:', error);
            }
        );
    }

    saveAssignment(): void {
        this.assignmentsService.addAssign(this.newAssignment).subscribe(
            (response: Assignements) => {
                console.log('Assignment saved:', response);
                this.modalService.dismissAll();
                this.newAssignment = new Assignements(); // Reset newAssignment object
                this.getAllAssignments(); // Refresh assignment list
            },
            (error: any) => {
                console.error('Error saving assignment:', error);
            }
        );
    }
    openEditModal(assignment: Assignements): void {
        // Implement logic to open the edit modal and pre-fill it with assignment details
        // For example, you can emit an event or use a service to communicate with the modal component
        console.log('Opening edit modal for assignment:', assignment);
        // You might emit an event to trigger the modal opening in the parent component
        // Alternatively, you can directly manipulate the DOM to show the modal
    }
    updateAssignment(): void {
        // Assuming selectedAssignment has an id property
        this.assignmentsService.updateAssign(this.selectedAssignment.idAssign, this.selectedAssignment).subscribe(
            (response: Assignements) => {
                console.log('Assignment updated:', response);
                // Optionally, you can dismiss modal and refresh assignment list here
                // this.modalService.dismissAll();
                // this.getAllAssignments();
            },
            (error: any) => {
                console.error('Error updating assignment:', error);
            }
        );
    }

    editAssignment(assignment: Assignements, content: any): void {
        this.selectedAssignment = assignment;
        this.modalService.open(content, { ariaLabelledBy: 'editAssignmentModalLabel' });
    }

    deleteAssignment(id: number): void {
        if (confirm('Are you sure you want to delete this assignment?')) {
            this.assignmentsService.removeAssign(id).subscribe(
                () => {
                    console.log('Assignment deleted:', id);
                    this.getAllAssignments(); // Refresh assignment list
                },
                (error: any) => {
                    console.error('Error deleting assignment:', error);
                }
            );
        }
    }

    onPageChange(event: any): void {
        // Handle pagination change
        console.log(event);
    }

    openAddAssignmentModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'addAssignmentModalLabel' });
    }

    openEditAssignmentModal(content: any): void {
        this.modalService.open(content, { ariaLabelledBy: 'editAssignmentModalLabel' });
    }
}
