import * as AuthActions from './auth.actions'
import {User} from "../models/user.model";
const initialState = {
  user:null,
  authError:null,
  loading:false
}
export function AuthReducer(state=initialState ,action:AuthActions.AuthActionsList){

  switch (action.type){
    case AuthActions.LOGIN:
      const user = new User(action.payload.email, action.payload.userId,action.payload.token,action.payload.expireDate);
      return {
        ...state,
        user:user,
        authError: null,
        loading: false
      }
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:

      return {
        ...state,
        authError:null,
        loading: false
      }
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user:null,
        authError:action.payload,
        loading:false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user:null
      }
    default:
    return state

  }
}
