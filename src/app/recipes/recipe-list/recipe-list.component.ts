import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { PaginationService } from '../../shared/pagination.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  pager: any;

  recipesChangedSubscription: Subscription;

  pagerChangedSubscription: Subscription;

  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private paginationService: PaginationService ) {}

  ngOnInit() {

    this.recipesChangedSubscription = this.recipeService.recipesChanged
      .subscribe((recipes: Recipe []) => this.recipes = recipes);

    this.pagerChangedSubscription = this.recipeService.pagerChanged
      .subscribe(pager => this.pager = pager);

    this.recipeService.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
    
  }

  onAddNewRecipe(){
  	this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSetPage(pageNumber: number) {

    
    if(pageNumber !== this.pager.currentPage
      && pageNumber <= this.pager.totalPages 
      && pageNumber >= 1) {
  
      this.router.navigate(['/recipes']);
      this.recipeService.getRecipes(pageNumber, this.pager.pageSize)
        .subscribe(recipes => this.recipes = recipes);
    }
  }

  getAuthService() {
    return this.authService;
  }
}
