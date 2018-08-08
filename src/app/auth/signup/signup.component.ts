import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.existedEmail.bind(this)),
      'password': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
    });
  }

  onSignup() {
    const user: User = new User();
    user.email = this.signupForm.value.email;
    user.password = this.signupForm.value.password;
    user.firstName = this.signupForm.value.firstName;
  	user.lastName = this.signupForm.value.lastName;

    this.authService.signUpUser(user);
    this.router.navigate(['/signin']);
  }

  existedEmail(control: FormControl) : Promise<any>{
    return this.authService.emailExist(control.value);
  }

}
