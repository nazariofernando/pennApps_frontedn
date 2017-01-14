import { Component }   from '@angular/core';

@Component({
	selector: 'about-us',
	templateUrl: './about-us.component.html',
	styleUrls: [ './about-us.component.css']
})
export class AboutUsComponent {

	aboutCompany = "Cool text about us and the startup story here";

	infos = [
		{
			name: "Fernando Nazario",
			about: "I like Chai",
			pic: "./fernando_picture.jpg"
		},
		{
			name: "Jackson Chen",
			about: "I like Code",
			pic: "./jackson_picture.jpg"
		},
		{
			name: "Matthew Barad",
			about: "I like Suicidal Memes",
			pic: "./matthew_picture.jpg"
		}
	];

}