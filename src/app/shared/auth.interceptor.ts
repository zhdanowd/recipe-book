import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

		if(this.authService.getToken() != null) {
			request = request.clone({headers: request.headers.append('Authorization', 'Bearer ' + this.authService.getToken())});
		}

		console.log(request);
		return next.handle(request);
	}
}