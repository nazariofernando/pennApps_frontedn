import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
	selector: 'apiTest',
	templateUrl: './api.component.html',
	styleUrls: [ './api.component.css']
})
export class ApiTestComponent {

	currentUser;
	constructor(private af: AngularFire, private auth: FirebaseAuth, private http: Http){
		this.auth.subscribe(auth => {this.currentUser = auth.auth})
	}

	jsonExample = {
		email: "nazariof@bc.edu",
		gen: 5,
		ind: 4,
		params: {
			param1: 3,
			param2: 2
		},
		percentages: {
			param1: 0.25,
			param2: 0.25
		},
		min: {
			param1: 0,
			param2: 0
		},
		max: {
			param1: 0,
			param2: 0
		},
		evaluation: "100 - Math.pow(params['param1'] - params['param2'], 2)",
		state: true
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	doIt(){
		this.http
			.post("https://darwindesignsapi.herokuapp.com/api", JSON.stringify(this.jsonExample), {headers: this.headers})
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError)
	}

	currentGen = 0
	currentInd = 0
	getAData(){
		let name = this.currentUser.email.substring(0, this.currentUser.email.indexOf("@"))
		this.af.database.object('/api/' + name + '/0').subscribe(snap => {
			this.currentGen = snap.gen
			this.currentInd = snap.ind
		})
	}

	current;
	getEData(gen, ind){
		let name = this.currentUser.email.substring(0, this.currentUser.email.indexOf("@"))
		this.current = this.af.database.list('/api/' + name + '/' + gen + '/' + ind)
	}

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}

}