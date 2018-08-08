import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe = new Recipe();
  units = ['GRAMS', 'ITEMS'];

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params: Params) => {
  				this.id = +params['id'];
          this.editMode = params['id'] != null;
          if(this.editMode){
            this.recipeService.getRecipe(this.id)
              .subscribe((recipe: Recipe) => {
                this.recipe = recipe;
                this.initForm();
              });
          } else {
            this.initForm();
          }
  			}
  		);
    this.initForm();
  }

  get formData() { return <FormArray>this.recipeForm.get('ingredients'); }

  onSubmit() {
   this.recipeService.saveRecipe(this.id, this.recipeForm.value);
   this.onCancel();
  }

  initForm() {
    let recipeName = '';
    let imgPath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      recipeName = this.recipe.name;
      imgPath = this.recipe.imagePath;
      description = this.recipe.description;
      if(this.recipe['ingredients']) {
        for(let ingredient of this.recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredient.id),
              'name': new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              'units' : new FormControl(ingredient.units, Validators.required)
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imgPath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'units' : new FormControl(null, Validators.required)
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
