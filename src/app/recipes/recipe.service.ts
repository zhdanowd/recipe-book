import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

import { Recipe } from './recipe.model'; 
import { Ingredient } from '../shared/ingredient.model';
import { Constants} from '../shared/constants.model';
import { PaginationService } from '../shared/pagination.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{

  recipes: Recipe[] = [];

  recipesChanged: Subject<Recipe[]> = new Subject();

  pagerChanged: Subject <any> = new Subject;

  constructor(private shoppingListService: ShoppingListService,
              private http: HttpClient,
              private paginationService: PaginationService,
              private constants: Constants){}


  getRecipes(pageNumber: number = 1, pageSize: number = 5) {
   
    return this.http.get(this.constants.backendUrl + 'recipes', {params: {pageNumber: (pageNumber - 1).toString(), pageSize: pageSize.toString()} })
      .pipe(
        map((response: any) => {
          this.pagerChanged.next( this.paginationService.getPager(response.totalElements, response.number + 1, response.pageSize));
          return this.recipes = response.content;
          ;
        }),
        catchError((error: Response) => {
          console.log(error);
          return throwError('something went wrong');         
        })
      );
  }

  getRecipe(id: number){
      return this.http.get<Recipe>(this.constants.backendUrl + 'recipes/' + id);

   }

  addIngredients(ingredients: Ingredient []){
     this.shoppingListService.addIngredients(ingredients);
   }

  saveRecipe(id: number, recipe: Recipe) {

    recipe.id = id;

    this.http.put(this.constants.backendUrl + 'recipes', recipe).subscribe(
      (updatedRecipe: Recipe) => {

        this.recipes = this.recipes.map(recipe => {
          if (recipe.id === updatedRecipe.id) {
            return updatedRecipe;
          }
          return recipe;
        });

        console.log(this.recipes);     
        this.recipesChanged.next(this.recipes.slice());
      },
      (error) => console.log(error)
    );
}

   deleteRecipe(id: number) {
     this.http.delete(this.constants.backendUrl + 'recipes/' + id).subscribe(
        (response: Response) => {
          console.log(response);
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
          this.recipesChanged.next(this.recipes.slice());
        },
        (error) => {
          console.log(error)
        }
      )
   }

}