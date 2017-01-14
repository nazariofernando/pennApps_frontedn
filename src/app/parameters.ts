import { Param } from './parameter';

export const PARAMS: Param[] = [
		{
			name: "Fuselage Length",
			value: 18,
			min: 18,
			max: 27,
			step: 0,
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
			step: 0,
			valueName: "locationWing"
		},
		{
			name: "Stabilizer Distance from Nose",
			value: 0,
			min: 0,
			max: 27,
			step: 0,
			valueName: "locationStab"
		},
		{
			name: "Vertical Tail Distance from Nose",
			value: 0,
			min: 0,
			max: 27,
			step: 0,
			valueName: "locationVert"
		},
		{
			name: "Mass of Nose",
			value: 0,
			min: 0,
			max: 30,
			step: 0,
			valueName: "massNose"
		},
		{
			name: "Wing Span",
			value: 1,
			min: 1,
			max: 27,
			step: 0,
			valueName: "spanWing"
		},
		{
			name: "Wing Root Chord",
			value: 1,
			min: 1,
			max: 10,
			step: 0,
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
			step: 0,
			valueName: "angleWing"
		},
		{
			name: "Stabilizer Span",
			value: 1,
			min: 1,
			max: 27,
			step: 0,
			valueName: "spanStab"
		},
		{
			name: "Stabilizer Root Chord",
			value: 1,
			min: 1,
			max: 10,
			step: 0,
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
			step: 0,
			valueName: "angleStab"
		},
		{
			name: "Vertical Tail Height",
			value: 1,
			min: 1,
			max: 27,
			step: 0,
			valueName: "spanVert"
		},
		{
			name: "Vertical Tail Root Chord",
			value: 1,
			min: 1,
			max: 10,
			step: 0, 
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
			step: 0,
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