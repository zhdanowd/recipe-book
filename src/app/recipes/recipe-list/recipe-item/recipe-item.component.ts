import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {}

}
