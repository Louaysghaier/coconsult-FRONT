import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../_models/Contract';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private baseUrl = 'http://localhost:8082/Contract'; // Update with your Spring Boot API URL

  constructor(private http: HttpClient) {}

  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.baseUrl}/GetAllContract`);
  }

  addContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.baseUrl}/ajouterContract`, contract);
  }

  addContractAffectReper(contract: Contract, repertoireId: number): Observable<Contract> {
    const url = `${this.baseUrl}/ajouterContractAffecRepertoire/${repertoireId}`;
    return this.http.post<Contract>(url, contract).pipe(
      catchError(error => {
        throw 'Erreur lors de lajout du contrat : ' + error; 
      })
    );
  }

  getContract(contractId: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.baseUrl}/GetContract/${contractId}`);
  }

  // contract.service.ts

  updateContract(updatedContract: Contract): Observable<Contract> {
    const id = updatedContract.idContract; // Assuming idContract is the correct property name
    return this.http.put<Contract>(`${this.baseUrl}/updateContract/${id}`, updatedContract);
  }
  


  removeContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveContract/${id}`);
  }
}
