import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode: boolean = false;
  editIndexItem: number;
  editItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('f') formData: NgForm;
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editIndexItem = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngreient(index);
        this.formData.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngreient(
        this.editIndexItem,
        newIngredient
      );
    } else {
      this.shoppingListService.addNewIngreient(newIngredient);
    }
    this.editMode = false;
    this.formData.reset();
  }

  onClear() {
    this.formData.reset();
    this.editMode = false;
  }
  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngreient(this.editIndexItem);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
