import { Component, OnInit } from '@angular/core';
import { CreditRequest } from '../../../Models/request.model';
import { CreditRequestService } from '../../../Services/credit-request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCreditRequestService } from '../../../Services/update-credit-request.service';
import { NotifyService } from '../../../Services/notify.service';

@Component({
  selector: 'app-view-user-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-user-request.component.html'
})
export class ViewUserRequestComponent implements OnInit{

  requestsList: CreditRequest[] = [];
  filteredRequests: CreditRequest[] = [];
  filterStatus: string = '';

  constructor(private creditRequestService: CreditRequestService,
    private viewRequestService:  UpdateCreditRequestService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.creditRequestService.getAll().subscribe(data => {
      this.requestsList = data;
      this.filteredRequests = data;
    });
  }

  filterRequests() {
    if (this.filterStatus.trim() === '') {
      this.filteredRequests = this.requestsList;
    } else {
      const filter = this.filterStatus.toLowerCase();
      this.filteredRequests = this.requestsList.filter(req => req.status.toLowerCase().includes(filter));
    }
  }

  saveStatus(request: any): void {  
  const userId = 1;
  this.viewRequestService.updateStatus(request.id, request.status, userId).subscribe({
    next: () => {
      this.notify.success('Estado actualizado correctamente.');
    },
    error: (err) => {
      this.notify.error(err.error);
    }
  });
}

}
