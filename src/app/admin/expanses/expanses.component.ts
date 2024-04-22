import { Component, OnInit } from '@angular/core';
import { Expanses } from '../../_models/expanses';
import { ExpansesService } from '../../_services/expanses.service';

@Component({
    selector: 'app-expanses',
    templateUrl: './expanses.component.html',
    styleUrls: ['./expanses.component.css']
})
export class ExpansesComponent implements OnInit {
    expansesList: Expanses[] = [];
    selectedExpense: Expanses | null = null;
    searchCategory: string = '';
    newExpense: Expanses = new Expanses(); // Déclarer et initialiser newExpense avec une nouvelle instance de Expense
    errorMessage: string = '';
    totalExpenses: number = 0; // Nombre total de dépenses
    pageSizeOptions: number[] = [5, 10, 25, 100]; // Options de taille de page
    showExpensesTable: boolean = true; // Afficher le tableau par défaut
    isAddExpenseModalOpen: boolean = true;

    // Pagination
    pagedExpenses: Expanses[] = [];
    pageSize: number = 5;
    currentPage: number = 1;

    constructor(private expansesService: ExpansesService) { }

    ngOnInit(): void {
        this.getAllExpenses();
    }

saveExpense(): void {
        this.expansesService.addExpanse(this.newExpense).subscribe(
            (response: any) => {
                console.log('Expense saved:', response);
                //this.closeAddExpenseModal();
                this.getAllExpenses();
                this.newExpense = new Expanses(); // Réinitialiser le formulaire après l'ajout
            },
            (error: any) => {
                console.error('Error saving expense:', error);
            }
        );
    }

    getAllExpenses(): void {
        this.expansesService.getAllExpanses().subscribe(
            (expanses: Expanses[]) => {
                this.expansesList = expanses;
                this.updatePagedExpenses();
            },
            (error: any) => {
                this.errorMessage = 'Une erreur s\'est produite lors de la récupération des dépenses.';
                console.error(error);
            }
        );
    }

    updateExpense(): void {
        if (!this.selectedExpense) {
            return;
        }

        this.expansesService.updateExpanse(this.selectedExpense.idExps, this.selectedExpense).subscribe(
            () => {
                this.errorMessage = '';
                this.getAllExpenses(); // Recharger la liste des dépenses après la mise à jour
                this.selectedExpense = null; // Réinitialiser la dépense sélectionnée
            },
            (error: any) => {
                this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour de la dépense.';
                console.error(error);
            }
        );
    }

    onPageChange(event: any): void {
        // Calculer l'index de la première dépense sur la page actuelle
        const startIndex = event.pageIndex * event.pageSize;
        // Extraire les dépenses de la liste complète en fonction de l'index de départ et de la taille de la page
        this.pagedExpenses = this.expansesList.slice(startIndex, startIndex + event.pageSize);
    }

    updatePagedExpenses(): void {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        // Vérifier que l'index de fin n'excède pas la taille totale de la liste des dépenses
        if (endIndex <= this.expansesList.length) {
            this.pagedExpenses = this.expansesList.slice(startIndex, endIndex);
        } else {
            // Si l'index de fin est supérieur à la taille de la liste, mettre à jour la liste avec les éléments restants
            this.pagedExpenses = this.expansesList.slice(startIndex);
        }
    }

    deleteExpense(id: number): void {
        this.expansesService.deleteExpanse(id).subscribe(
            () => {
                this.errorMessage = '';
                this.getAllExpenses(); // Recharger la liste des dépenses après la suppression
            },
            (error: any) => {
                this.errorMessage = 'Une erreur s\'est produite lors de la suppression de la dépense.';
                console.error(error);
            }
        );
    }

    editExpense(expense: Expanses): void {
        this.selectedExpense = expense;
        //this.showExpensesTable = true; // Afficher le tableau lors de l'édition
    }

    /*cancelEdit(): void {
        this.selectedExpense = null;
    }*/

    /*openAddExpenseModal(): void {
        this.isAddExpenseModalOpen = true;
    }*/

    /*closeAddExpenseModal(): void {
        this.isAddExpenseModalOpen = false;
    }*/
}
