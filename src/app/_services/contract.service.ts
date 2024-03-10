import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../_models/Contract';
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

  getContract(contractId: number): Observable<Contract> {
    return this.http.get<Contract>(`${this.baseUrl}/GetContract/${contractId}`);
  }

  // contract.service.ts

  updateContract(updatedContract: Contract): Observable<Contract> {
    const id = updatedContract.idContract; // Assuming idContract is the correct property name
    return this.http.put<Contract>(`${this.baseUrl}/updateContract/{id}`, updatedContract);
  }


  removeContract(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/RemoveContract/${id}`);
  }
}
