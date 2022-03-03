import { EventEmitter } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('ingredient', 5),
    new Ingredient('ingredient2', 6),
    new Ingredient('ingredient3', 7),
    new Ingredient('ingredient4', 8),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  addNewIngreient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngreient(index: number, data: Ingredient) {
    const selectItem = this.getIngreient(index);
    selectItem.name = data.name;
    selectItem.amount = data.amount;
    return this.getIngreient(index);
  }
  addIngreients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  getIngreient(index: number): Ingredient {
    return this.ingredients[index];
  }
  deleteIngreient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
