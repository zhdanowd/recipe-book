import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { map } from 'rxjs/operators';

import { User } from '../shared/user.model';
import { Constants } from '../shared/constants.model';

@Injectable()
export class AuthService {

	constructor(private http: HttpClient,
				private router: Router,
				private jwtHelper: JwtHelper,
				private constants: Constants){}

	signUpUser(user: User) {
		this.http.post(this.constants.backendUrl + 'signup', user)
			.subscribe(
				(response: Response) => console.log(response),
				(error) => console.log(error)
			);
	}

	signInUser(email: string, password: string) {
		this.http.post(this.constants.backendUrl + 'token/generate-token', {email: email, password: password}) .subscribe(
			(response: Response) => {
				window.localStorage['token'] = response['token'];
				this.router.navigate(['/']);
			},
      		(error) => console.log(error)
      	)
	}

	getToken() {
		return window.localStorage.getItem('token');
	}

	isAuthenticated() {
		const token = this.getToken();

		if(token) {
			if(this.isTokenExpired(token)) {
				console.log('token is expired')
				this.logout();
			} else {
				return true;
			}
		}

		return false;
	}

	isTokenExpired(token: string) {
		return this.jwtHelper.isTokenExpired(token);
	}

	logout() {
		window.localStorage.removeItem('token');
		this.router.navigate(['/signin']);
	}

	isAdmin() {
		const token = this.getToken();
		if(token) {
			const decodedToken = this.jwtHelper.decodeToken(token);
			return (<string>decodedToken['scopes']).includes('ROLE_ADMIN');
		}
		return false;
	}

	isUser() {
		const token = this.getToken();
		if(token) {
			const decodedToken = this.jwtHelper.decodeToken(token);
			return (<string>decodedToken['scopes']).includes('ROLE_USER');
		}
		return false;
	}

	emailExist(email: string) {
		return this.http.get(this.constants.backendUrl + 'users/' + email + '/exist').pipe(
				map((response) => {
					if(response === true) {
						return {'emailExist': response};
					}
					return null;
				})).toPromise();
	}

}