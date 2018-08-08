import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { PaginationService } from './pagination.service';

@NgModule({
	declarations: [
		DropdownDirective
	],
	exports: [
		CommonModule,
		DropdownDirective
	]
})
export class SharedModule{} 