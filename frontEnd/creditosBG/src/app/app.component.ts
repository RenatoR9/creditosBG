import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'creditosBG';

  role: string | null = null;
  roleName: string | null = null;
  userName: string | null = null;
  loggedInStatus: boolean = false;
  private tokenSub?: Subscription

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {

    this.authService.isLoggedIn().subscribe(status => {
    this.loggedInStatus = status;
  });

   this.authService.getCurrentToken().subscribe(token => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userName = decoded['Name'] || decoded['unique_name'] || decoded['name'];
        this.role = decoded['RoleId'] || null;
        this.roleName = decoded['role'] || null;
      } catch {
        this.userName = null;
        this.role = null;
        this.roleName =  null;
      }
    } else {
      this.userName = null;
      this.role = null;
      this.roleName =  null;
    }
  });

  }

  loadUserRole() {
    const token = this.authService.getToken();
    if (token) {
      try {
       const decoded: any = jwtDecode(token);
       this.userName = decoded.unique_name || decoded.name || decoded.UserName || decoded.Name || decoded.sub || null;
        this.role = decoded.RoleId || null;
         this.roleName = decoded.role || null;
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.role = null;
      }
    } else {
      this.role = null;
    }
  }

  isSolicitante(): boolean {
  return this.roleName === 'Solicitante';
}

isAnalista(): boolean {
  return this.roleName === 'Analista';
}

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
  this.tokenSub?.unsubscribe();
}
}
