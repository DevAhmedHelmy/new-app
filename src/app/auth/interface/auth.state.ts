import {User} from "../models/user.model";

export interface AuthState {
  user:User,
  authError: string,
  loading: boolean

}
