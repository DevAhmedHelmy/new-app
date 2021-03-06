import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import AuthResponseInterface from '../interface/auth.response.interface';
import { User } from '../models/user.model';
import * as fromApp from '../../store/app.reducer'
import {Store} from "@ngrx/store";
import * as AuthActions from '../store/auth.actions'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private experissonTimeOut: any;
  constructor(private http: HttpClient, private router: Router,private store:Store<fromApp.AppState>) {}
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
      }),
      tap((resData) => {
        this.handelAuthData(
          resData.email,
          resData.localId,
          resData.idToken,
          resData.expiresIn
        );
      })
    );
  }

  login(data) {
    data['returnSecureToken'] = true;
    const url = `${this.apiUrl}:signInWithPassword?key=${this.key}`;
    return this.http.post<AuthResponseInterface>(url, data).pipe(
      catchError((err) => {
        return this.handleError(err);
      }),
      tap((resData) => {
        this.handelAuthData(
          resData.email,
          resData.localId,
          resData.idToken,
          resData.expiresIn
        );
      })
    );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._taskFactories)
    );
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.Login({email:userData.email,userId:userData.id,token:userData._token,expireDate:new Date(userData._taskFactories)}));
      const timeExp = new Date(userData._taskFactories).getTime() - new Date().getTime();
      this.autoLogout(timeExp);
    }
  }
  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.experissonTimeOut) {
      clearTimeout(this.experissonTimeOut);
    }
    this.experissonTimeOut = null;
  }
  autoLogout(expireDuration) {
    this.experissonTimeOut = setTimeout(() => {
      localStorage.removeItem('userData');
      this.logout();
    }, expireDuration);
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'A nuknown error';
    if (!err.error || !err.error.error) {
      return throwError(errorMessage);
    }

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

  private handelAuthData(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const expireDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expireDate);
    this.store.dispatch(new AuthActions.Login({email:email,userId:localId,token:idToken,expireDate:expireDate}))
    // this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
