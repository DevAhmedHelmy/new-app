import {Action} from "@ngrx/store";
export const LOGIN_START = '[Auth] Login Start'
export const LOGIN = '[Auth] Login'
export const SIGNUP_START = '[Auth] Signup Start'
export const LOGOUT = '[Auth] Logout'
export const LOGIN_FAIL = '[Auth] Login Fail'


export class Login implements Action{
  readonly type = LOGIN;
  constructor(public payload :{email: string,
    userId: string,
    token: string,
    expireDate: Date}) {
  }
}
export class SignUpStart implements Action{
  readonly type = SIGNUP_START;
  constructor(public payload:{email:string,password:string}) {
  }
}
export class Logout{
  readonly type = LOGOUT
}

export class LoginStart implements Action{
  readonly type = LOGIN_START
  constructor(public payload:{email:string,password:string}) {
  }
}

export class LoginFail implements Action{
  readonly type=LOGIN_FAIL
  constructor(public payload) {
  }
}


export type AuthActionsList = Login | SignUpStart|Logout|LoginStart|LoginFail;
