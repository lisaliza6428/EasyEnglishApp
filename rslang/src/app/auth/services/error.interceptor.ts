/* eslint-disable import/named */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorModel } from '../models/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, public dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.getToken();
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    });
    return next.handle(request).pipe(
      catchError((error: ErrorModel) => {
        switch (error.status) {
          case 401:
            this.error401Action();
            break;

          case 403:
            this.error403Action();
            break;

          case 409:
            this.error409Action();
            break;
        }
        return throwError(error);
      })
    );
  }

  getToken() {
    const data = localStorage.getItem('token') || '';
    if (data) {
      const token = JSON.parse(data).token;
      return token;
    }
  }

  error401Action() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'error401',
      message: 'modals.error401.message',
      actionButtonText: 'modals.error401.confirm',
      cancelButtonText: 'modals.error401.cancel',
    };
    this.dialog.open(ModalComponent, dialogConfig);
    this.router.navigateByUrl('welcome');
  }

  error403Action() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'error403',
      message: 'modals.error403.message',
      actionButtonText: 'modals.error403.confirm',
      cancelButtonText: 'modals.error403.cancel',
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }

  error409Action() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'error409',
      message: 'modals.error409.message',
      actionButtonText: 'modals.error409.confirm',
      cancelButtonText: 'modals.error409.cancel',
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }
}
