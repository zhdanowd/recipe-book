import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component'; 


@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingListEditComponent
	],
	imports: [
		CommonModule,
		FormsModule
	]
})
export class ShoppingListModule{}