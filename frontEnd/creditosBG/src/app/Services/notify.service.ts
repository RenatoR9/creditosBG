import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

success(message: string, title: string = 'Éxito') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  info(message: string, title: string = 'Información') {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  warning(message: string, title: string = 'Advertencia') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  confirmDeletion(message: string = '¿Estás seguro de eliminar la solicitud?', title: string = 'Confirmación'): Promise<boolean> {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    return result.isConfirmed;
  });
}

}
