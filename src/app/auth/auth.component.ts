import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import AuthResponseInterface from './interface/auth.response.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authSer: AuthService) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const data = {
      email: form.value.email,
      password: form.value.password,
    };
    let authObs: Observable<AuthResponseInterface>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authSer.login(data);
    } else {
      authObs = this.authSer.signUp(data);
    }
    authObs.subscribe(
      (res) => {
        this.isLoading = false;
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );
    form.reset();
  }
}
