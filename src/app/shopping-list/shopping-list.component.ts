import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  constructor() {}
  ingredients: Ingredient[] = [
    new Ingredient('ingredient', 5),
    new Ingredient('ingredient2', 6),
    new Ingredient('ingredient3', 7),
    new Ingredient('ingredient4', 8),
  ];
  ngOnInit(): void {}

  addNewIngreient(ingredient) {
    this.ingredients.push(ingredient);
  }
}
