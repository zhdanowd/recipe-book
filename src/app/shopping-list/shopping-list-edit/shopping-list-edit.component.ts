import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'; 
import { Units, Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number
  editedItem: Ingredient;
  units = ['GRAMS', 'ITEMS'];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.form.setValue({'name': this.editedItem.name, 'amount': this.editedItem.amount, 'units': this.editedItem.units});
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(this.editedItem.id, form.value['name'], form.value['amount'], form.value['units']))
    } else {
      this.shoppingListService.addIngredient(new Ingredient(null, form.value['name'], form.value['amount'], form.value['units']));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

}
