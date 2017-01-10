import { Component } from '@angular/core';

@Component({
	selector: 'alpha-morphs',
	templateUrl: './alpha-morphs.component.html',
	styleUrls: [ './alpha-morphs.component.css' ]
})
export class AlphaMorphsComponent {

	title = "Alpha Morphs";

	parameters = [
		{
			name: "Parameter 1",
			value: 0
		},
		{
			name: "Parameter 2",
			value: 0
		}
	]

}