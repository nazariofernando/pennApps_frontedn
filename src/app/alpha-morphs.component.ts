import {Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
var evaluation = require('../assets/evaluation.js');
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
			name: "Fuselage Width",
			value: 0.05,
			min: 0.05,
			max: 0.5,
			step: 0.05,
			valueName: "widthFuselage"
		},
		{
			name: "Fuselage Depth",
			value: 0,
			min: 0,
			max: 1,
			step: 0.1,
			valueName: "depthFuselage"
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
		{
			name: "Wing Thickness",
			value: 0,
			min: 0,
			max: 1.5,
			step: 0.1,
			valueName: "thicknessWing"
		},
		{
			name: "Wing Density",
			value: 0,
			min: 0,
			max: 1,
			step: 0.1,
			valueName: "densityWing"
		},
	]

}

// GENERATING CANVAS

$(document).ready(function() {
	var name = "1";
	var canvas = $(".glider-img > canvas")[0];
	var context = canvas.getContext('2d');

	updateCanvas(context, name);

	$("input").change(function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		updateCanvas(context, name);
	})

	$("#saveImg > .button").click(function() {
		var img = canvas.toDataURL("image/png");
		window.open(img);
		var a = document.createElement('a');
		a.href = img;
		a.download = 'image.png';

		a.click();
	})
});

function updateCanvas(c, name) {
	var lengthFuselage = $("#lengthFuselage").val(),
		locationWing = $("#locationWing").val(),
		locationStab = $("#locationStab").val(),
		locationVert = $("#locationVert").val(),
		massNose = $("#massNose").val(),
		spanWing = $("#spanWing").val(),
		spanWing = $("#spanWing").val(),
		crWing = $("#crWing").val(),
		trWing = $("#trWing").val(),
		angleWing = $("#angleWing").val(),
		spanStab = $("#spanStab").val(),
		crStab = $("#crStab").val(),
		trStab = $("#trStab").val(),
		angleStab = $("#angleStab").val(),
		spanVert = $("#spanVert").val(),
		crVert = $("#crVert").val(),
		trVert = $("#trVert").val(),
		angleVert = $("#angleVert").val(),
		thicknessWing = $("#thicknessWing").val(),
		densityWing = $("#densityWing").val(),
		widthFuselage = $("#widthFuselage").val(),
		depthFuselage = $("#depthFuselage").val();

	var gliderInfo = ["1", 0, lengthFuselage, locationWing, locationStab, 					  locationVert, massNose, 20, spanWing, crWing, trWing, angleWing, 0, spanStab, crStab, trStab, angleStab, 0, spanVert, crVert, trVert, angleVert, 0, "", "3/16x3/8x36 spruce, 1/8x4x48 balsa", 121.92, 10.16, thicknessWing, densityWing, 91.44, 0.01666, widthFuselage, depthFuselage, 30, 5.7, 1.22];

	var flyability = Math.round(evaluation.analyze(gliderInfo)),
		leftOffset = 13,
		midHeight = c.canvas.height / 2,
		scale = 13;

	lengthFuselage = lengthFuselage * scale;
	widthFuselage = widthFuselage * scale;	

	c.fillStyle = '#000';
	c.lineWidth = 1;
	c.beginPath();
	c.moveTo(leftOffset, midHeight - widthFuselage);
	c.lineTo(leftOffset + lengthFuselage, midHeight - widthFuselage);
	c.lineTo(leftOffset + lengthFuselage, midHeight + widthFuselage);
	c.lineTo(leftOffset, midHeight + widthFuselage);
	c.closePath();
	c.stroke();

	locationWing = locationWing * scale;
	spanWing = spanWing * scale / 2;
	crWing = crWing * scale;
	trWing = trWing;
	angleWing = angleWing * Math.PI / 180;
	var ctWing = trWing * crWing;

	c.fillStyle = '#f00';
	c.beginPath();
	c.moveTo(leftOffset + locationWing, midHeight + widthFuselage);
	c.lineTo(leftOffset + locationWing + crWing, midHeight + widthFuselage);
	c.lineTo(leftOffset + locationWing + crWing + spanWing * Math.tan(angleWing), midHeight + widthFuselage + spanWing);
	c.lineTo(leftOffset + locationWing + crWing + spanWing * Math.tan(angleWing) - ctWing, midHeight + widthFuselage + spanWing);
	c.closePath();
	c.fill();
	c.beginPath();
	c.moveTo(leftOffset + locationWing, midHeight - widthFuselage);
	c.lineTo(leftOffset + locationWing + crWing, midHeight - widthFuselage);
	c.lineTo(leftOffset + locationWing + crWing + spanWing * Math.tan(angleWing), midHeight - widthFuselage - spanWing);
	c.lineTo(leftOffset + locationWing + crWing + spanWing * Math.tan(angleWing) - ctWing, midHeight - widthFuselage - spanWing);
	c.closePath();
	c.fill();

	locationStab = locationStab * scale;
	spanStab = spanStab * scale / 2;
	crStab = crStab * scale;
	trStab = trStab;
	angleStab = angleStab * Math.PI / 180;
	var	ctStab = trStab * crStab;

	c.fillStyle = '#0f0';
	c.beginPath();
	c.moveTo(leftOffset + locationStab, midHeight + widthFuselage);
	c.lineTo(leftOffset + locationStab + crStab, midHeight + widthFuselage);
	c.lineTo(leftOffset + locationStab + crStab + spanStab * Math.tan(angleStab), midHeight + widthFuselage + spanStab);
	c.lineTo(leftOffset + locationStab + crStab + spanStab * Math.tan(angleStab) - ctStab, midHeight + widthFuselage + spanStab);
	c.closePath();
	c.fill();
	c.beginPath();
	c.moveTo(leftOffset + locationStab, midHeight - widthFuselage);
	c.lineTo(leftOffset + locationStab + crStab, midHeight - widthFuselage);
	c.lineTo(leftOffset + locationStab + crStab + spanStab * Math.tan(angleStab), midHeight - widthFuselage - spanStab);
	c.lineTo(leftOffset + locationStab + crStab + spanStab * Math.tan(angleStab) - ctStab, midHeight - widthFuselage - spanStab);
	c.closePath();
	c.fill();

	locationVert = locationVert * scale;
	crVert = crVert * scale;

	c.fillStyle = '#0ff';
	c.beginPath();
	c.moveTo(leftOffset + locationVert, midHeight - widthFuselage);
	c.lineTo(leftOffset + locationVert + crVert, midHeight - widthFuselage);
	c.lineTo(leftOffset + locationVert + crVert, midHeight + widthFuselage);
	c.lineTo(leftOffset + locationVert, midHeight + widthFuselage);
	c.closePath();
	c.fill();

	c.font = "16px Arial";
	c.fillStyle = '#000';
	c.fillText("Species Name: " + name, leftOffset, 20.5);
	c.fillText("Flyability: " + flyability, leftOffset, 40.5);
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

function handleScroll() {
	if (getScrollTop() > 375) {
		var newWidth = $(".parameters").outerWidth() + "px";
		$(".glider-img").css({
			"position": "fixed",
			"top": "10px",
			"width": newWidth,
			"transform": "translateX(" + newWidth + ")"
		});
	}
	else {
		$(".glider-img").css({
			"position": "relative",
			"transform": "none",
			"top": "auto",
			"left": "auto"
		});
	}
}

var scrollTimer = null;
$(window).scroll(function() {
	if (scrollTimer) {
		clearTimeout(scrollTimer);
	}
	scrollTimer = setTimeout(handleScroll(), 1000);
})