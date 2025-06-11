import { Component, OnInit } from '@angular/core';
import { CreditRequest } from '../../Models/request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditRequestService } from '../../Services/services/credit-request.service';

@Component({
  selector: 'app-credit-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-requests.component.html'
})
export class CreditRequestsComponent implements OnInit{

  requestsList: CreditRequest[] = [];
  showCreateModal: boolean = false;
  modalTitle: string = '';
  isModalOpen = false;


  request: CreditRequest  = {
      id : 0,
      amountRequested : 0,
      termInMonths : 0,
      monthlyIncome : 0,
      workSeniorityYears : 0,
      status : 'pendiente',
      userId: 1
  };
  
  constructor(
    private service: CreditRequestService
  ) {}

  

  ngOnInit() {
    this.loadRequests();    
  }

  loadRequests() {
    this.service.getAll().subscribe(data => {
      this.requestsList = data;
    });
  }

  editRequest(item: CreditRequest) {
    this.modalTitle = 'Editar Solicitud';
    this.request = { ...item };
    this.showCreateModal = true;
  }

  saveCreditRequest() {
    if (this.request.id) {
      this.service.update(this.request.id, this.request).subscribe(() => {
        this.loadRequests();
        this.modalTitle = 'Editar Solicitud';  
        this.showCreateModal = false;
      });
    } else {
      this.service.create(this.request).subscribe(() => {
        this.loadRequests();
        this.showCreateModal = false;
        this.clearRequest();
      });
    }
  }

  deleteRequest(id: number) {
    if (confirm('¿Está seguro de eliminar la solicitud?')) {
      this.service.delete(id).subscribe(() => {
        this.loadRequests();
      });
    }
  }

  onMonthlyIncomeChange(){
    if(this.request.monthlyIncome >= 1500){
      this.request.status = 'aprobado'
    }else{
      this.request.status = 'pendiente'
    }
  }

  createdRequest() {
    this.modalTitle = 'Crear Solicitud';  
      this.showCreateModal = true;
  }

  clearRequest() {
    this.request = {
      id: 0,
      amountRequested: 0,
      termInMonths: 0,
      monthlyIncome: 0,
      workSeniorityYears: 0,
      status: '',
      userId: 1
    };
  }

  closeModalCreditRequest(){
    this.showCreateModal = false;
    this.clearRequest();
  }
}
