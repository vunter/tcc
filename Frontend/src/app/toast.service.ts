import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccessTitle(message, title?, timeout?) {
    this.toastr.success(message, title, {
      timeOut: timeout ? timeout : 3000
    });
  }

  showErrorTitle(message, title?, timeout?) {
    this.toastr.error(message, title, {
      timeOut: timeout ? timeout : 3000
    });
  }
  showInfoTitle(message, title?, timeout?) {
    this.toastr.info(message, title, {
      timeOut: timeout ? timeout : 3000
    });
  }
  showWarningTitle(message, title?, timeout?) {
    this.toastr.warning(message, title, {
      timeOut: timeout ? timeout : 3003
    });
  }

  showSuccess(message, timeout?) {
    this.toastr.success(message, '', {
      timeOut: timeout ? timeout : 3000
    });
  }
  showError(message, timeout?) {
    this.toastr.error(message, '', {
      timeOut: timeout ? timeout : 3000
    });
  }
  showInfo(message, timeout?) {
    this.toastr.info(message, '', {
      timeOut: timeout ? timeout : 3000
    });
  }
  showWarning(message, timeout?) {
    this.toastr.warning(message, '', {
      timeOut: timeout ? timeout : 3000
    });
  }

}
