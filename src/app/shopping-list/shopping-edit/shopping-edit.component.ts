import { EventEmitter } from '@angular/core';
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameElementRef: ElementRef;
  @ViewChild('amountInput') amountElementRef: ElementRef;
  @Output() ingredientAdd = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit(): void {}

  onAddItem() {
    const newIngredient = new Ingredient(
      this.nameElementRef.nativeElement.value,
      this.amountElementRef.nativeElement.value
    );
    this.ingredientAdd.emit(newIngredient);
  }
}
