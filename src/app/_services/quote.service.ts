import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../_models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private baseUrl = 'http://localhost:8082/quotes';

  constructor(private http: HttpClient) { }
  getAllQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/getAllQuotes`);
  }

  getQuoteById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.baseUrl}/getQuotesById/${id}`);
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/ajouterQuote`, quote);
  }

  updateQuote(id: number, quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(`${this.baseUrl}/updateQuote/${id}`, quote);
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteQuote/${id}`);
  }

  // Récupérer les devis pour un projet spécifique
  getQuotesForProject(projectId: number): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/getQuotesForProject/${projectId}`);
  }

  // Récupérer les devis pour un client spécifique
  getQuotesForClient(clientId: number): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/getQuotesForClient/${clientId}`);
  }

  // Calculer le montant total des devis pour un projet
  getTotalQuoteAmountForProject(projectId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getTotalQuoteAmountForProject/${projectId}`);
  }

  // Valider les devis
/*validateQuotes(quotes: Quote[]): Observable<boolean> {
    // Implémentez la logique de validation ici
  }*/
}
