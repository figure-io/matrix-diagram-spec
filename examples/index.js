'use strict';

var spec = require( './../lib' ),
	goodChart,
	badChart,
	isValid,
	tmpl;

// Load in our chart configurations...
goodChart = require( './good.json' );
badChart = require( './bad.json' );

// Validate:
isValid = spec.validate( goodChart );
console.log( 'Valid: ' + isValid );
console.log( spec.errors() );

isValid = spec.validate( badChart );
console.log( 'Valid: ' + isValid );
console.dir( spec.errors() );

// Create a new configuration from a template:
tmpl = spec.template();

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
tmpl.axes[ 0 ].label = 'Columns';
tmpl.axes[ 1 ].label = 'Rows';
tmpl.marks[ 0 ].data.name = 'boop';
tmpl.marks[ 0 ].properties.fill.field = 'a';
tmpl.marks[ 0 ].properties.fillOpacity.field = 'b';
tmpl.interactions.brushable = true;
tmpl.interactions.sortableRows = true;
tmpl.interactions.sortableCols = false;

isValid = spec.validate( tmpl );
console.log( 'Valid: ' + isValid );
console.log( spec.errors() );
