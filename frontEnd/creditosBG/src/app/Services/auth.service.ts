import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7094/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(userName: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { userName, passwordUser: password })
      .pipe(tap(response => {
        console.log('Nuevo token emitido:', response.token);
        localStorage.setItem('token', response.token);
         this.tokenSubject.next(response.token);  // <-- AQUI es lo importante
      this.loggedIn.next(true);
      }));
  }

 register(userName: string, password: string): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/register`,
    { userName, passwordUser: password },
    { responseType: 'text' }  // <-- Aquí le dices que la respuesta es texto plano
  );
}

  logout() {
    localStorage.removeItem('token');
     this.tokenSubject.next(null);   // <-- Importante también
  this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded['RoleId'] || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

    getCurrentToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

}
