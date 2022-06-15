/* eslint-disable import/named */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorModel } from '../models/models';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, public dialog: MatDialog, public authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.getToken();
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    });
    console.log(request);
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
      const token = JSON.parse(data).refreshToken;
      //const token = JSON.parse(data).token;
      return token;
    }
  }

  error401Action() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'error401',
      message: 'Ваша сессия истекла. Чтобы продолжить, необходимо войти',
      actionButtonText: 'Войти',
      cancelButtonText: 'Закрыть',
    };
    this.dialog.open(ModalComponent, dialogConfig);
    this.authService.logOut();
    this.router.navigateByUrl('auth/log-in');
  }

  error403Action() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'error403',
      message: 'Неправильные email или пароль',
      actionButtonText: 'Ок',
      cancelButtonText: 'Закрыть',
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }

  error409Action() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      name: 'error409',
      message: 'Такой пользователь уже существует',
      actionButtonText: 'Ок',
      cancelButtonText: 'Закрыть',
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }
}
