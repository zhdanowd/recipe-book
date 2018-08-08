import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import { Constants } from '../shared/constants.model';

@Injectable()
export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[];

  constructor(private http: HttpClient, private constants: Constants) {
  }

  getIngredients(){
    	this.http.get(this.constants.backendUrl + 'users/shopping-list').subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
          this.ingredientsChanged.next(ingredients);
        });
      
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.http.post(this.constants.backendUrl + 'ingredients', [ingredient]).subscribe(
      (ingredients: Ingredient[]) => {

        this.ingredients.push(ingredients[0]);
        this.ingredientsChanged.next(this.ingredients);
        }
      );
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.http.put(this.constants.backendUrl + 'ingredients', ingredient).subscribe(
      (ingredient: Ingredient) => {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients);
      }
    )
  }



  addIngredients(ingredients: Ingredient[]){
   ingredients.forEach(ingredient => ingredient.id = null);
   this.http.post(this.constants.backendUrl + 'ingredients', ingredients).subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients.concat(ingredients);
        this.ingredientsChanged.next(this.ingredients);
        }
      );
  }

  deleteIngredient(index: number) {
    this.http.delete(this.constants.backendUrl + 'ingredients/' + this.ingredients[index].id).subscribe(
      (response) => {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    )
    
  }

}