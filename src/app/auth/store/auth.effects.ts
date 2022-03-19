import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions'
import {catchError, map, of, switchMap, tap} from "rxjs";
import AuthResponseInterface from "../interface/auth.response.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
@Injectable()
export class AuthEffects{
  @Effect()
  authSignUp = this. actions$.pipe(ofType(AuthActions.SIGNUP_START),switchMap((signupData:AuthActions.SignUpStart)=>{
      const url = `${environment.authApiUrl}:signUp?key=${environment.fireBaseKey}`;
      return this.http.post<AuthResponseInterface>(url, {
        email:signupData.payload.email,
        password:signupData.payload.password,
        returnSecureToken:true
      }).pipe(map(signUpRes=>{
        const expireDate = new Date(new Date().getTime() + +signUpRes.expiresIn * 1000);

        return  of(new AuthActions.Login({email:signUpRes.email,userId:signUpRes.localId,token:signUpRes.idToken,expireDate}))
      }),catchError(erorr=>{
        let errorMessage = 'A nuknown error';
        if (!erorr.error || !erorr.error.error) {
          return  of(new AuthActions.LoginFail(errorMessage))
        }
        switch (erorr.error.error.message) {
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
        return  of(new AuthActions.LoginFail(errorMessage))
      }));
    }),

  )
  @Effect()
  authLogin = this. actions$.pipe(ofType(AuthActions.LOGIN_START),switchMap((authData:AuthActions.LoginStart)=>{
    const url = `${environment.authApiUrl}:signInWithPassword?key=${environment.fireBaseKey}`;
    return this.http.post<AuthResponseInterface>(url, {
      email:authData.payload.email,
      password:authData.payload.password,
      returnSecureToken:true
    }).pipe(map(resData=>{
      const expireDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);

      return  of(new AuthActions.Login({email:resData.email,userId:resData.localId,token:resData.idToken,expireDate}))
      }),catchError(err=>{
      let errorMessage = 'A nuknown error';
      if (!err.error || !err.error.error) {
        return  of(new AuthActions.LoginFail(errorMessage))
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
      return  of(new AuthActions.LoginFail(errorMessage))
    }));
  }),

  )
  @Effect({dispatch:false})
  authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN),tap(()=> {this.router.navigate(['/'])}))
  constructor(private actions$:Actions,private http:HttpClient,private router:Router) {
  }
}
