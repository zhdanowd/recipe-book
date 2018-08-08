import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PaginationService } from '../shared/pagination.service';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent{
}
