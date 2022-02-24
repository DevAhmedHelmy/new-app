import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameElementRef: ElementRef;
  @ViewChild('amountInput') amountElementRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem() {
    const newIngredient = new Ingredient(
      this.nameElementRef.nativeElement.value,
      this.amountElementRef.nativeElement.value
    );
    this.shoppingListService.addNewIngreient(newIngredient);
  }
}
