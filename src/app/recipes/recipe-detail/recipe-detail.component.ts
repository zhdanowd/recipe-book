import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params, Router, } from '@angular/router';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
  id : number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          const recipe = this.recipeService.recipes.find(recipe => recipe.id === this.id);
          console.log(recipe);
          if(recipe) {
            this.recipe = recipe;
          } else {
            this.recipeService.getRecipe(this.id).subscribe(
              (recipe: Recipe) => this.recipe = recipe,
              (error) => this.router.navigate(['../'], {relativeTo: this.route})
            );
          }
        }
      );
  }

  onAddToShoppingList() {
    console.log(this.recipe);
 	  this.recipeService.addIngredients(this.recipe.ingredients);

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isAuthenticated () {
    return this.authService.isAuthenticated();
  }

  isAdmin () {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

}
