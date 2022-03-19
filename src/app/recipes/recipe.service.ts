import { Injectable } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer'

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanaged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanaged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
    // this.shoppingListService.addIngreients(ingredients);
  }

  addRecipe(data: Recipe) {
    this.recipes.push(data);
    this.recipesChanaged.next(this.recipes.slice());
  }

  updateRecipe(index: number, data: Recipe) {
    this.recipes[index] = data;
    this.recipesChanaged.next(this.recipes.slice());
  }

  DeleteItem(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanaged.next(this.recipes.slice());
  }
}
