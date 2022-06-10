/* eslint-disable import/named */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { validateUpperCase, validateLowerCase, validateNumbers, validateSpecial } from '../../services/validators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  show = false;

  formGroup!: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          validateUpperCase,
          validateLowerCase,
          validateNumbers,
          validateSpecial,
          Validators.minLength(8),
        ],
      ],
    });
  }

  get _email() {
    return this.formGroup.controls['email'];
  }

  get _password() {
    return this.formGroup.controls['password'];
  }

  onSubmit() {
    if (this.formGroup.status === 'VALID') {
      this.authService.logIn(this.formGroup.value);
    }
  }

  toggleVisibility(e: Event) {
    this.show = !this.show;
    e.preventDefault();
  }
}
