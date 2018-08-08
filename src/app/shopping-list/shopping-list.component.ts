import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[];
  subscribtion: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscribtion = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => {this.ingredients = ingredients}
    )
    this.shoppingListService.getIngredients();
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

}
