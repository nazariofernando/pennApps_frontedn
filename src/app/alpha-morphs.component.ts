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

	title = "Alpha Morph: A Glider Optimization Platform";

	name = "";
	generations = 0;
	parameters = PARAMS;

	best = {}
	keys = []
	place = []
	constructor(private alphaMorphService: AlphaMorphService, private af: AngularFire) { };

	conditional = false

	currentGlider = {}
	maxMin = []
	currentSet = [];

	createGlider(): void {

		let name = this.name
		let numberGen = this.generations

		let params = {}
		for(let param of this.parameters) {
			let nameParam = param.name
			params[nameParam] = param.value
			this.maxMin.push([param.min, param.max])
		}

		params["1 Piece of Wood"] = 0
		params["Throwing Velocity"] = 20
		params["Wing Sweep Type"] = 0
		params["Stabilizer Sweep Type"] = 0
		params["Vertical Tail Sweep Type"] = 0

		let gliderInfo = ["1",0, this.parameters[0].value, this.parameters[3].value, this.parameters[4].value, this.parameters[5].value, this.parameters[6].value, 20, this.parameters[7].value, this.parameters[8].value, this.parameters[9].value, this.parameters[10].value, 0, this.parameters[11].value, this.parameters[12].value, this.parameters[13].value, this.parameters[14].value, 0, this.parameters[15].value, this.parameters[16].value, this.parameters[17].value, this.parameters[18].value, 0, "", "3/16x3/8x36 spruce, 1/8x4x48 balsa", 121.92, 10.16, this.parameters[19].value, this.parameters[20].value, 91.44, 0.01666, this.parameters[1].value, this.parameters[2].value, 30, 5.7, 1.22];

		let aery = Math.round(evaluation.analyze(gliderInfo))

		params["aery"] = aery

		this.alphaMorphService.createGlider(name, params, numberGen)

		this.af.database.object('/' + name + '/0', { preserveSnapshot: true })
			.subscribe(snapshot => {
			  this.currentGlider = snapshot.val().params
			});



		for(let i = 1; i <= numberGen; i++){
			for(let j = 0; j < 50; j++){
				let mutateGlider = this.alphaMorphService.mutateGlider(this.currentGlider, this.maxMin)
				this.af.database.object('/' + name + '/' + i + '/' + j).set(mutateGlider)
				if(mutateGlider["aery"] > this.currentGlider["aery"]){
					this.currentGlider = mutateGlider
					this.place = [i, j]
				}
			}
		}

		this.best = this.currentGlider
		this.keys = Object.keys(this.best)
		this.af.database.object('/' + name + '/bestGlider').set(this.best)

		this.af.database.list('/' + name, { preserveSnapshot: true })
			.subscribe(snapshots => {
				snapshots.forEach(snapshot => {
					this.currentSet.push(snapshot.val())
				})
			})

	}

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

	var gliderInfo = ["1", 0, lengthFuselage, locationWing, locationStab, locationVert, massNose, 20, spanWing, crWing, trWing, angleWing, 0, spanStab, crStab, trStab, angleStab, 0, spanVert, crVert, trVert, angleVert, 0, "", "3/16x3/8x36 spruce, 1/8x4x48 balsa", 121.92, 10.16, thicknessWing, densityWing, 91.44, 0.01666, widthFuselage, depthFuselage, 30, 5.7, 1.22];

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

/*
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
*/
