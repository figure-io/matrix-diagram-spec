'use strict';

var validate = require( './../lib' ),
	goodChart,
	badChart,
	isValid,
	tmpl;

// Load in our chart configurations...
goodChart = require( './good.json' );
badChart = require( './bad.json' );

// Validate:
isValid = validate( goodChart );
console.log( '\nValid: ' + isValid );
console.log( validate.errors );

isValid = validate( badChart );
console.log( '\nValid: ' + isValid );
console.dir( validate.errors );

// Create a new configuration from a template:
tmpl = validate.template();

tmpl.name = 'Beep';
tmpl.data.name = 'boop';
tmpl.data.rownames = [ 'foo', 'bar' ];
tmpl.data.colnames = [ 'baz', 'bop' ];
tmpl.data.values = [
	[
		{ 'a': 1, 'b': 0.56 },
		{ 'a': 0, 'b': 0.79 }
	],
	[
		{ 'a': 0, 'b': 0.99 },
		{ 'a': 1, 'b': 0.12 }
	]
];
tmpl.canvas.width = 600;
tmpl.canvas.height = 400;
tmpl.axes.x.label = 'Columns';
tmpl.axes.y.label = 'Rows';
tmpl.marks[ 0 ].data.name = 'boop';
tmpl.marks[ 0 ].properties.fill.field = 'a';
tmpl.marks[ 0 ].properties.fillOpacity.field = 'b';
tmpl.interactions.brushable = true;
tmpl.interactions.sortableRows = true;
tmpl.interactions.sortableCols = false;

isValid = validate( tmpl );
console.log( '\nValid: ' + isValid );
console.log( validate.errors );
