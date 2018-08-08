import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { UserGuard } from './auth/guards/user-guard.service';

const appRoutes : Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard, UserGuard]},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
		imports:[RouterModule.forRoot(appRoutes)],
		exports:[RouterModule]
	}
)
export class AppRoutingModule{}