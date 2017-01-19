import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { AlphaMorphService } from './alpha-morphs.service';

import { Param } from "./parameter";
import { PARAMS } from "./parameters";

var evaluation = require('../assets/evaluation.js');
declare var $:any;


@Component({
	selector: 'alpha-morphs',
	templateUrl: './alpha-morphs.component.html',
	styleUrls: [ './alpha-morphs.component.css' ]
})
export class AlphaMorphsComponent {

	title = "Alpha Morph: A Glider Evolution Platform";

}

