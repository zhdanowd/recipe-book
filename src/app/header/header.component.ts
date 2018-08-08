import { Component } from '@angular/core'

import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent{

	constructor(private authService: AuthService){}

	onLogout() {
		this.authService.logout();
	}

	isAuthenticated() {
		return this.authService.isAuthenticated();
	}

	isUser() {
		return this.authService.isUser();
	}


}