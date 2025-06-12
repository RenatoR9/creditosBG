import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditRequest } from '../Models/request.model';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {
  private apiUrl = 'https://localhost:7094/api/CreditRequest';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CreditRequest[]> {
    return this.http.get<CreditRequest[]>(this.apiUrl);
  }

  getById(id: number): Observable<CreditRequest> {
    return this.http.get<CreditRequest>(`${this.apiUrl}/${id}`);
  }

  create(request: CreditRequest): Observable<CreditRequest> {
    return this.http.post<CreditRequest>(this.apiUrl, request);
  }

  update(id: number, request: CreditRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
