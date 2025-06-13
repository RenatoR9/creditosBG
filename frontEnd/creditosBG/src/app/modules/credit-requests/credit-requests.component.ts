import { Component, OnInit } from '@angular/core';
import { CreditRequest } from '../../Models/request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditRequestService } from '../../Services/credit-request.service';
import { AuthService } from '../../Services/auth.service';
import { NotifyService } from '../../Services/notify.service';

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
    private service: CreditRequestService,
    private auth: AuthService,
    private notify: NotifyService
  ) {}

  

  ngOnInit() {
    this.loadRequests(); 
    this.request.userId = Number(this.auth.getUserIdFromToken());   
  }

  loadRequests() {
    //valida si es solicitante para que muestre los datos del usuario logueado
    if(this.auth.getRoleIdFromToken() === 1 ){
       this.service.getByIdUserHistoryRequest().subscribe(data => {
      this.requestsList = data;
    });
    }else{
      // si es analista puede ver todos
      this.service.getAll().subscribe(data => {
      this.requestsList = data;
    });
    }
   
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
        this.notify.success('Se actualizo correctamente.');
      });
    } else {
      this.service.create(this.request).subscribe(() => {
        this.loadRequests();
        this.showCreateModal = false;
        this.clearRequest();
        this.notify.success('Se registro correctamente.');
      });
    }
  }

  deleteRequest(id: number) {
    this.notify.confirmDeletion().then((confirmed) => {
      if (confirmed) {
        this.service.delete(id).subscribe(() => {
            this.loadRequests();
        });   
      }
    });
  }

  onMonthlyIncomeChange(){
    //validacion para setear estado dependiendo de los ingresos
    if(this.request.monthlyIncome >= 1500){
      this.request.status = 'aprobado'
    }else{
      this.request.status = 'pendiente'
    }
  }

  createdRequest() {
    this.clearRequest();
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
      status: 'pendiente',
      userId: Number(this.auth.getUserIdFromToken())
    };
  }

  closeModalCreditRequest(){
    this.showCreateModal = false;
    this.clearRequest();
  }
}
