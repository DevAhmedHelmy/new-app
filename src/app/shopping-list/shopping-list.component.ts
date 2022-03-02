import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientChanged: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChanged =
      this.shoppingListService.ingredientChanged.subscribe((res) => {
        this.ingredients = res;
      });
  }
  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientChanged.unsubscribe();
  }
}
