import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AlphaMorphService {

	ref;
	constructor(private af: AngularFire) {
		this.ref = af.database
	}

	createGlider(name, params, numberOfGen): void {
		this.ref.object('/' + name + '/0').set({
			numberOfGen,
			params
		})
	}

}