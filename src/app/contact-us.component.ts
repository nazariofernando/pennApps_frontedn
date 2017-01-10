import { Component } from '@angular/core';

@Component({
	selector: 'contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: [ './contact-us.component.css']
})
export class ContactUsComponent {

	name = "Your Name";
	phone = "1729429000";
	email = "youremail@email.com";

	subjects = [
	{
		name: "Investment",
		val: 1
	},
	{ 
		name: "Work",
		val: 2
	},
	{
		name:"Questions",
		val: 3 
	},
	{ 
		name: "Partnerships",
		val: 4
	},
	{
		name: "Press",
		val: 5
	},
	{
		name: "Chit Chat",
		val: 6
	}];
	
	text = "your text here"

}