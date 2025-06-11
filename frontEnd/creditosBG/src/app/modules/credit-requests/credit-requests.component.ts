import { Component, OnInit } from '@angular/core';
import { CreditRequest } from '../../Models/request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-requests.component.html'
})
export class CreditRequestsComponent implements OnInit{
  creditRequests: CreditRequest[] = [];
  showCreateModal: boolean = false;


  request: CreditRequest  = {
      amountRequested : 0,
      termInMonths : 0,
      monthlyIncome : 0,
      workSeniorityYears : 0,
      status : ''
  };
  
  constructor(
  ) {}

  

  ngOnInit() {
    
  }

  openCreateModal() {
  this.showCreateModal = true;
}

closeCreateModal() {
  this.showCreateModal = false;
}

editRequest(request: CreditRequest) {
  
}

deleteRequest(request: CreditRequest) {
  
}

createdRequest() {
  
}
}
