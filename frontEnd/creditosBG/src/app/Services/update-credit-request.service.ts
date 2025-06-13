import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateCreditRequestService {

  private apiUrl = 'https://localhost:7094/api/ViewCreditRequest';

  constructor(private http: HttpClient,private auth: AuthService) { }

  updateStatus(entityId: number, newStatus: string, userId: number): Observable<void> {
    const headers = this.auth.createAuthHeaders();
  const body = {
    entityId: entityId,
    newStatus: newStatus,
    userId: userId
  };

  console.log('body ',body);

  return this.http.put<void>(`${this.apiUrl}/updateStatus`, body,{headers});
}
}
