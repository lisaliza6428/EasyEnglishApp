import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PopupActionsService {
  constructor(public authService: AuthService) {}

  modalAction(modalData: any) {
    switch (modalData.name) {
      case 'logout':
        this.authService.logOut();
        console.log('logout');
        break;

      case 'deleteProfile':
        this.authService.deleteUser();
        break;

      default:
        break;
    }
  }
}
