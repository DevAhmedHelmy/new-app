import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
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
  addIngreients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    console.log(this.ingredients.slice());
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
