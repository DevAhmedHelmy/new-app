import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import {AuthState} from "../auth/interface/auth.state";
import { ActionReducerMap} from "@ngrx/store";
import {AuthReducer} from '../auth/store/auth.reducer'



export  interface AppState{
  shoppingList : fromShoppingList.State,
  auth :AuthState
}

export const appReducers :ActionReducerMap<AppState> = {
  shoppingList:fromShoppingList.shoppingListReducer ,
  auth:AuthReducer
}
