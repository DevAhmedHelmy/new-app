import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'app/shared/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer'
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
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}
  @ViewChild('f') formData: NgForm;
  ngOnInit(): void {
    this.subscription =  this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editIngredientIndex > -1){
        this.editMode = true;
        this.editIndexItem = stateData.editIngredientIndex;
        this.editItem = stateData.editIngredient;
        this.formData.setValue({
                name: this.editItem.name,
                amount: this.editItem.amount,
              });
      }else {
        this.editMode=false;
      }
    })
    // this.subscription = this.shoppingListService.startEditing.subscribe(
    //   (index: number) => {
    //     this.editIndexItem = index;
    //     this.editMode = true;
    //     this.editItem = this.shoppingListService.getIngreient(index);
    //     this.formData.setValue({
    //       name: this.editItem.name,
    //       amount: this.editItem.amount,
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new shoppingListActions.UpdateIngredient(newIngredient)
      );
      // this.shoppingListService.updateIngreient(
      //   this.editIndexItem,
      //   newIngredient
      // );
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addNewIngreient(newIngredient);
    }
    this.editMode = false;
    this.formData.reset();
  }

  onClear() {
    this.formData.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
  onDelete() {
    this.onClear();
    this.store.dispatch(
      new shoppingListActions.DeleteIngredient()
    );
    // this.shoppingListService.deleteIngreient(this.editIndexItem);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());

  }
}
