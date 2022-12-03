/* eslint-disable import/named */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name = '';

  constructor(public authService: AuthService, public dialog: MatDialog) {
    this.name = authService.userName;
  }

  ngOnInit() {
    this.authService.userNameChange.subscribe((value) => {
      this.name = value;
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'logout',
      message: 'Вы действительно хотите выйти из аккаунта?',
      actionButtonText: 'Да, выйти',
      cancelButtonText: 'Отмена',
    };
    console.log(dialogConfig);
    this.dialog.open(ModalComponent, dialogConfig);
  }
}
