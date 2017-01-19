import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

var evaluation = require('../assets/evaluation.js');

@Injectable()
export class AlphaMorphService {

	ref;
	constructor(private af: AngularFire) {
		this.ref = af.database
	}

	createGlider(name, params, numberOfGen,oe): void {
		this.ref.object('/' + oe + '/' + name + '/0').set({
			numberOfGen,
			params
		})
	}

	mutateGlider(params, maxMin) {

		let mutation = {}

		mutation["Fuselage Length"] = this.calcChances(params["Fuselage Length"], 0.25, maxMin[0])
		mutation["Wing Distance from Nose"] = this.calcChances(params["Wing Distance from Nose"], 0.25, maxMin[3])
		mutation["Stabilizer Distance from Nose"] = this.calcChances(params["Stabilizer Distance from Nose"], 0.25, maxMin[4])
		mutation["Vertical Tail Distance from Nose"] = this.calcChances(params["Vertical Tail Distance from Nose"], 0.25, maxMin[5])
		mutation["Mass of Nose"] = this.calcChances(params["Mass of Nose"], 0.25, maxMin[6])
		mutation["Wing Span"] = this.calcChances(params["Wing Span"], 0.25, maxMin[7])
		mutation["Wing Root Chord"] = this.calcChances(params["Wing Root Chord"], 0.25, maxMin[8])
		mutation["Wing Taper Ratio"] = this.calcChances(params["Wing Taper Ratio"], 0.025, maxMin[9])
		mutation["Wing Leading Edge Angle"] = this.calcChances(params["Wing Leading Edge Angle"], 0.25, maxMin[10])
		mutation["Stabilizer Span"] = this.calcChances(params["Stabilizer Span"], 0.25, maxMin[11])
		mutation["Stabilizer Root Chord"] = this.calcChances(params["Stabilizer Root Chord"], 0.25, maxMin[12])
		mutation["Stabilizer Taper Ratio"] = this.calcChances(params["Stabilizer Taper Ratio"], 0.025, maxMin[13])
		mutation["Stabilizer Leading Edge Angle"] = this.calcChances(params["Stabilizer Leading Edge Angle"], 0.25, maxMin[14])
		mutation["Vertical Tail Height"] = this.calcChances(params["Vertical Tail Height"], 0.25, maxMin[15])
		mutation["Vertical Tail Root Chord"] = this.calcChances(params["Vertical Tail Root Chord"], 0.25, maxMin[16])
		mutation["Vertical Tail Taper Ratio"] = this.calcChances(params["Vertical Tail Taper Ratio"], 0.025, maxMin[17])
		mutation["Vertical Tail Leading Edge Angle"] = this.calcChances(params["Vertical Tail Leading Edge Angle"], 0.25, maxMin[18])
		mutation["Wing Thickness"] = params["Wing Thickness"]
		mutation["Wing Density"] = params["Wing Density"]
		mutation["Fuselage Width"] = params["Fuselage Width"]
		mutation["Fuselage Depth"] = params["Fuselage Depth"]
		mutation["1 Piece of Wood"] = 0
		mutation["Throwing Velocity"] = 20
		mutation["Wing Sweep Type"] = 0
		mutation["Stabilizer Sweep Type"] = 0
		mutation["Vertical Tail Sweep Type"] = 0

		let gliderInfo = [
		"1", 0,
		mutation["Fuselage Length"],
		mutation["Wing Distance from Nose"],
		mutation["Stabilizer Distance from Nose"],
		mutation["Vertical Tail Distance from Nose"],
		mutation["Mass of Nose"], 20,
		mutation["Wing Span"],
		mutation["Wing Root Chord"],
		mutation["Wing Taper Ratio"],
		mutation["Wing Leading Edge Angle"], 0,
		mutation["Stabilizer Span"],
		mutation["Stabilizer Root Chord"],
		mutation["Stabilizer Taper Ratio"],
		mutation["Stabilizer Leading Edge Angle"], 0,
		mutation["Vertical Tail Height"],
		mutation["Vertical Tail Root Chord"],
		mutation["Vertical Tail Taper Ratio"],
		mutation["Vertical Tail Leading Edge Angle"], 0,
		"", "3/16x3/8x36 spruce, 1/8x4x48 balsa", 121.92, 10.16,
		mutation["Wing Thickness"],
		mutation["Wing Density"], 91.44, 0.01666,
		mutation["Fuselage Width"],
		mutation["Fuselage Depth"], 30, 5.7, 1.22
		];

		mutation["aery"] = Math.round(evaluation.analyze(gliderInfo))

		if(isNaN(mutation["aery"]) || mutation["aery"] === Infinity ){
			mutation["aery"] = 0
		}

		return mutation
	}

	calcChances(num, diff, maxMin): number {
		if (maxMin.length === 0) {
			maxMin = [0, 0]
		}
	  if (Math.random() < 0.2) {
	    if (Math.random() < 0.5) {
	      return Math.abs(Number((num - diff).toFixed(5)) - Number(maxMin[0])) + Number(maxMin[0]);
	    }
	    else {
	      return Math.abs(Number((num + diff).toFixed(5)) - Number(maxMin[1])) + Number(maxMin[1]);
	    }
	  }
	  return num;
	}

}
