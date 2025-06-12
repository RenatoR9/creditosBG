import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateCreditRequestService {

  private apiUrl = 'https://localhost:7094/api/ViewCreditRequest';

  constructor(private http: HttpClient) { }

  updateStatus(entityId: number, newStatus: string, userId: number): Observable<void> {
  const body = {
    entityId: entityId,
    newStatus: newStatus,
    userId: userId
  };

  console.log('body ',body);

  return this.http.put<void>(`${this.apiUrl}/updateStatus`, body);
}
}
