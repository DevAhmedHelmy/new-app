import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [FormsModule, SharedModule, ShoppingListRoutingModule],
})
export class ShoppingListModule {}
