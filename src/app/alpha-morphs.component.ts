import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
declare var $:any;

@Component({
	selector: 'alpha-morphs',
	templateUrl: './alpha-morphs.component.html',
	styleUrls: [ './alpha-morphs.component.css' ]
})
export class AlphaMorphsComponent {

	title = "Alpha Morph: A Glider Optimization Platform";

	parameters = [
		{
			name: "Fuselage Length",
			value: 18,
			min: 18,
			max: 27,
			valueName: "lengthFuselage"
		},
		{
			name: "Wing Distance from Nose",
			value: 0,
			min: 0,
			max: 27,
			valueName: "locationWing"
		},
		{
			name: "Stabilizer Distance from Nose",
			value: 0,
			min: 0,
			max: 27,
			valueName: "locationStab"
		},
		{
			name: "Vertical Tail Distance from Nose",
			value: 0,
			min: 0,
			max: 27,
			valueName: "locationVert"
		},
		{
			name: "Mass of Nose",
			value: 0,
			min: 0,
			max: 30,
			valueName: "massNose"
		},
		{
			name: "Wing Span",
			value: 1,
			min: 1,
			max: 27,
			valueName: "spanWing"
		},
		{
			name: "Wing Root Chord",
			value: 1,
			min: 1,
			max: 10,
			valueName: "crWing"
		},
		{
			name: "Wing Taper Ratio",
			value: 0.4,
			min: 0.4,
			max: 1,
			step: 0.1,
			valueName: "trWing"
		},
		{
			name: "Wing Leading Edge Angle",
			value: 0,
			min: 0,
			max: 30,
			valueName: "angleWing"
		},
		{
			name: "Stabilizer Span",
			value: 1,
			min: 1,
			max: 27,
			valueName: "spanStab"
		},
		{
			name: "Stabilizer Root Chord",
			value: 1,
			min: 1,
			max: 10,
			valueName: "crStab"
		},
		{
			name: "Stabilizer Taper Ratio",
			value: 0.4,
			min: 0.4,
			max: 1,
			step: 0.1,
			valueName: "trStab"
		},
		{
			name: "Stabilizer Leading Edge Angle",
			value: 0,
			min: 0,
			max: 30,
			valueName: "angleStab"
		},
		{
			name: "Vertical Tail Height",
			value: 1,
			min: 1,
			max: 27,
			valueName: "spanVert"
		},
		{
			name: "Vertical Tail Root Chord",
			value: 1,
			min: 1,
			max: 10,
			valueName: "crVert"
		},
		{
			name: "Vertical Tail Taper Ratio",
			value: 0.4,
			min: 0.4,
			max: 1,
			step: 0.1,
			valueName: "trVert"
		},
		{
			name: "Vertical Tail Leading Edge Angle",
			value: 0,
			min: 0,
			max: 30,
			valueName: "angleVert"
		},
	]

}

// GENERATING CANVAS

$(document).ready(function() {
	var canvas = $(".glider-img > canvas")[0];
	var context = canvas.getContext('2d');

	updateCanvas(context);

	$("input").change(function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		updateCanvas(context);
	})
});

function updateCanvas(c) {
	var lengthFuselage = $("#lengthFuselage").val() * 10;
	c.fillStyle = '#000';
	c.beginPath();
	c.moveTo(13, 70);
	c.lineTo(13 + lengthFuselage, 70);
	c.lineTo(13 + lengthFuselage, 75);
	c.lineTo(13, 75);
	c.closePath();
	c.stroke();


	var locationWing = $("#locationWing").val() * 10,
		spanWing = $("#spanWing").val() * 5,
		crWing = $("#crWing").val() * 10,
		trWing = $("#trWing").val(),
		angleWing = $("#angleWing").val() * Math.PI / 180,
		ctWing = trWing * crWing;

	c.fillStyle = '#f00';
	c.beginPath();
	c.moveTo(13 + locationWing, 75);
	c.lineTo(13 + locationWing + crWing, 75);
	c.lineTo(13 + locationWing + crWing + spanWing * Math.tan(angleWing), 75 + spanWing);
	c.lineTo(13 + locationWing + crWing + spanWing * Math.tan(angleWing) - ctWing, 75 + spanWing);
	c.closePath();
	c.fill();
	c.beginPath();
	c.moveTo(13 + locationWing, 70);
	c.lineTo(13 + locationWing + crWing, 70);
	c.lineTo(13 + locationWing + crWing + spanWing * Math.tan(angleWing), 70 - spanWing);
	c.lineTo(13 + locationWing + crWing + spanWing * Math.tan(angleWing) - ctWing, 70 - spanWing);
	c.closePath();
	c.fill();

	var locationStab = $("#locationStab").val() * 10,
		spanStab = $("#spanStab").val() * 5,
		crStab = $("#crStab").val() * 10,
		trStab = $("#trStab").val(),
		angleStab = $("#angleStab").val() * Math.PI / 180,
		ctStab = trStab * crStab;

	c.fillStyle = '#0f0';
	c.beginPath();
	c.moveTo(13 + locationStab, 75);
	c.lineTo(13 + locationStab + crStab, 75);
	c.lineTo(13 + locationStab + crStab + spanStab * Math.tan(angleStab), 75 + spanStab);
	c.lineTo(13 + locationStab + crStab + spanStab * Math.tan(angleStab) - ctStab, 75 + spanStab);
	c.closePath();
	c.fill();
	c.beginPath();
	c.moveTo(13 + locationStab, 70);
	c.lineTo(13 + locationStab + crStab, 70);
	c.lineTo(13 + locationStab + crStab + spanStab * Math.tan(angleStab), 70 - spanStab);
	c.lineTo(13 + locationStab + crStab + spanStab * Math.tan(angleStab) - ctStab, 70 - spanStab);
	c.closePath();
	c.fill();

	var locationVert = $("#locationVert").val() * 10,
		crVert = $("#crVert").val() * 10;

	c.fillStyle = '#0ff';
	c.beginPath();
	c.moveTo(13 + locationVert, 71);
	c.lineTo(13 + locationVert + crVert, 71);
	c.lineTo(13 + locationVert + crVert, 74);
	c.lineTo(13 + locationVert, 74);
	c.closePath();
	c.fill();
}



// SCROLLING

function getScrollTop() {
    if (typeof window.pageYOffset !== 'undefined' ) {
      // Most browsers
      return window.pageYOffset;
    }

    var d = document.documentElement;
    if (d.clientHeight) {
      // IE in standards mode
      return d.scrollTop;
    }

    // IE in quirks mode
    return document.body.scrollTop;
  }

$(window).scroll(function() {
	if (getScrollTop() > 375) {
		$(".glider-img").css("top", (getScrollTop() - 375 ) + "px");
	}
	else {
		$(".glider-img").css("top", "0px");
	}
})