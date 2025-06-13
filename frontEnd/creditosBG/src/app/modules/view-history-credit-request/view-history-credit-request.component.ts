import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreditRequest } from '../../Models/request.model';
import { UpdateCreditRequestService } from '../../Services/update-credit-request.service';
import { CreditRequestService } from '../../Services/credit-request.service';

@Component({
  selector: 'app-view-history-credit-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-history-credit-request.component.html'
})
export class ViewHistoryCreditRequestComponent implements OnInit{
  historyList: CreditRequest[] = [];

    constructor(private requestService:  CreditRequestService
    ) { }
  
    ngOnInit(): void {
      this.loadHistoryRequests();
    }

      loadHistoryRequests() {
    this.requestService.getByIdUserHistoryRequest().subscribe(data => {
      this.historyList = data;
    });
  }

}
