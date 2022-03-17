import { Ingredient } from 'app/shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editIngredient: Ingredient;
  editIngredientIndex: number;
}
export interface AppState {
  shoppingList: State;
}
const initailState: State = {
  ingredients: [
    new Ingredient('ingredient', 5),
    new Ingredient('ingredient2', 6),
    new Ingredient('ingredient3', 7),
    new Ingredient('ingredient4', 8),
  ],
  editIngredient: null,
  editIngredientIndex: -1,
};
export function shoppingListReducer(
  state: State = initailState,
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
    case shoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updateIngreient = { ...ingredient, ...action.payload.ingredient };
      const updateIngreients = [...state.ingredients];
      updateIngreients[action.payload.index] = updateIngreient;
      return {
        ...state,
        ingredients: updateIngreients,
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
