import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import AuthResponseInterface from '../interface/auth.response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // signInWithPassword?key=[API_KEY]
  // signUp?key=[API_KEY]

  apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  key = 'AIzaSyBvNC5O91Zt6XpBHgxovpyPwHv7lCmfmM4';
  signUp(data) {
    const url = `${this.apiUrl}:signUp?key=${this.key}`;
    data['returnSecureToken'] = true;
    return this.http.post<AuthResponseInterface>(url, data).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  login(data) {
    data['returnSecureToken'] = true;
    const url = `${this.apiUrl}:signInWithPassword?key=${this.key}`;
    return this.http.post<AuthResponseInterface>(url, data).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'A nuknown error';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }
    console.log(err.error.error);

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email exists already';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'this PASSWORD is INVALID';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'EMAIL_NOT_FOUND';
        break;
      case 'USER_DISABLED':
        errorMessage = 'USER_DISABLED';
        break;
    }
    return throwError(errorMessage);
  }
}
