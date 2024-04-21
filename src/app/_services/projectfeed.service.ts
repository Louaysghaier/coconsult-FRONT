// proj-feed.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjFeed } from '../_models/projectFeed';

@Injectable({
  providedIn: 'root'
})
export class ProjFeedService {
  private baseUrl = 'http://localhost:8082/projfeeds'; // Replace this with your actual backend API endpoint

  constructor(private http: HttpClient) { }

  getProjFeeds(): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(this.baseUrl);
  }

  getProjFeedById(id: number): Observable<ProjFeed> {
    return this.http.get<ProjFeed>(`${this.baseUrl}/${id}`);
  }

  createProjFeed(projFeed: ProjFeed): Observable<ProjFeed> {
    return this.http.post<ProjFeed>(this.baseUrl, projFeed);
  }

  updateProjFeed(id: number, projFeed: ProjFeed): Observable<ProjFeed> {
    return this.http.put<ProjFeed>(`${this.baseUrl}/${id}`, projFeed);
  }

  deleteProjFeed(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getProjFeedWithProjects(id: number): Observable<ProjFeed> {
    return this.http.get<ProjFeed>(`${this.baseUrl}/${id}/projects`);
  }

  getProjFeedUpdatedAfterDate(date: string): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(`${this.baseUrl}/updatedAfterDate/${date}`);
  }

  getLastProjFeeds(limit: number): Observable<ProjFeed[]> {
    return this.http.get<ProjFeed[]>(`${this.baseUrl}/last/${limit}`);
  }

  getTotalProjFeedsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
