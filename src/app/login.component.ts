import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable,
	     FirebaseObjectObservable, FirebaseAuth } from 'angularfire2';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css']
})
export class LoginComponent {

	title = "Login"
	user = {
		email: "",
		password: ""
	}

	constructor(private af: AngularFire, private auth: FirebaseAuth, private router: Router){ }

	createNewUser(properties:Object) {
		return this.auth.createUser({
				email: this.user.email,
				password: this.user.password
			})
			.catch(error => {error.message})
			.then(() => {
				return this.router.navigate(['/apiTest'])
			})
	}

	logIn(){
		return this.auth.login({
			email: this.user.email,
			password: this.user.password
		})
		.catch(error => {error.message})
		.then(() => { return this.router.navigate(['/apiTest'])})
	}

}