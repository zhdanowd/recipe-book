import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { AdminGuard } from './auth/guards/admin-guard.service';
import { UserGuard } from './auth/guards/user-guard.service';
import { UserService } from './shared/user.service';
import { Constants } from './shared/constants.model';

import { PaginationService } from './shared/pagination.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AuthModule,
    ShoppingListModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [ 
    ShoppingListService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard,
    AdminGuard,
    UserGuard,
    JwtHelper,
    UserService,
    PaginationService,
    Constants
  ], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }
