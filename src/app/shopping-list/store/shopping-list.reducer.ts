import { Ingredient } from 'app/shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editIngredient: Ingredient;
  editIngredientIndex: number;
}
const initialState: State = {
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
  state: State = initialState,
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
      const ingredient = state.ingredients[state.editIngredientIndex];
      const updateIngredient = { ...ingredient, ...action.payload };
      const updateIngredients = [...state.ingredients];
      updateIngredients[state.editIngredientIndex] = updateIngredient;
      return {
        ...state,
        ingredients: updateIngredients,
        editIngredient:null,
        editIngredientIndex: -1
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item, index) => {
          return index !== state.editIngredientIndex;
        }),
        editIngredient:null,
        editIngredientIndex: -1
      };
    case shoppingListActions.START_EDIT:
      return {
        ...state,
        editIngredient: {...state.ingredients[action.payload]},
        editIngredientIndex: action.payload
      }
    case shoppingListActions.STOP_EDIT:
      return {
        ...state,
        editIngredient:null,
        editIngredientIndex: -1
      };
    default:
      return state;
  }
}
