import { Injectable } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();

  recipes: Recipe[] = [
    new Recipe('testing', 'testing', 'testing', [
      new Ingredient('meat', 1),
      new Ingredient('meat', 2),
    ]),
    new Recipe('testing 2', 'testing 2', 'testing 2', [
      new Ingredient('meat', 1),
      new Ingredient('meat', 2),
    ]),
    new Recipe('testing 3', 'testing 3', 'testing 3', [
      new Ingredient('meat', 1),
      new Ingredient('meat', 2),
    ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngreients(ingredients);
  }
}
