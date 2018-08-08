import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component'
import { RecipeStartComponent} from '../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component'; 
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { AdminGuard } from '../auth/guards/admin-guard.service';

const recipesRoutes: Routes = [
  {path: '', component: RecipesComponent, children:[
  		{path: '', component: RecipeStartComponent},
  		{path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard, AdminGuard]},
  		{path: ':id', component: RecipeDetailComponent},
  		{path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard, AdminGuard]}
  ]},
]

@NgModule({
	imports: [RouterModule.forChild(recipesRoutes)],
	exports: [RouterModule]
})
export class RecipesRoutingModule {}