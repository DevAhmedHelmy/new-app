import { Ingredient } from 'app/shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as shoppingListActions from './shopping-list.actions';
const initailState = {
  ingredients: [
    new Ingredient('ingredient', 5),
    new Ingredient('ingredient2', 6),
    new Ingredient('ingredient3', 7),
    new Ingredient('ingredient4', 8),
  ],
};
export function shoppingListReducer(
  state = initailState,
  action: shoppingListActions.shoppingListActions
) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    default:
      return state;
  }
}
