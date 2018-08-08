import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { SignupComponent } from '../auth/signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent
	],
	imports: [
    	CommonModule,
    	FormsModule,
    	ReactiveFormsModule,
    	AuthRoutingModule
    ]
})
export class AuthModule{}