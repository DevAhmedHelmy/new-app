import { Injectable } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
@Injectable()
export class RecipeService {
  recipesChanaged = new Subject<Recipe[]>();
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
