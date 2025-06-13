import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CreditRequest } from '../Models/request.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {
  private apiUrl = 'https://localhost:7094/api/CreditRequest';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll(): Observable<CreditRequest[]> {
     const headers = this.auth.createAuthHeaders();
    return this.http.get<CreditRequest[]>(this.apiUrl, { headers });
  }

  getById(id: number): Observable<CreditRequest> {
    const headers = this.auth.createAuthHeaders();
    return this.http.get<CreditRequest>(`${this.apiUrl}/${id}`, { headers });
  }

  create(request: CreditRequest): Observable<CreditRequest> {
     const headers = this.auth.createAuthHeaders();
    return this.http.post<CreditRequest>(this.apiUrl, request, { headers });
  }

  update(id: number, request: CreditRequest): Observable<void> {
     const headers = this.auth.createAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, request,{ headers });
  }

  delete(id: number): Observable<void> {
    const headers = this.auth.createAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers });
  }

    getByIdUserHistoryRequest(): Observable<CreditRequest[]> {
    const userId = this.auth.getUserIdFromToken();
     const headers = this.auth.createAuthHeaders();

    if (!userId) {
      return throwError(() => new Error('No se pudo obtener el ID del usuario.'));
    }

    return this.http.get<CreditRequest[]>(`${this.apiUrl}/user/${userId}`, { headers });
  }
}
