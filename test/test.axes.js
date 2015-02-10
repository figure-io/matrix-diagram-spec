/* global describe, it, before, beforeEach, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// FIXTURES //

var tmpl = require( './fixtures/template.json' );


// TESTS //

describe( 'axes', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without an axes field', function test() {
		template.axes = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid axes field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var axes = template.axes;
		for ( var i = 0; i < values.length; i++ ) {
			template.axes = axes;
			template.axes = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `x` and `y` fields', function test() {
		var axis;

		axis = template.axes.x;
		template.axes.x = undefined;
		assert.notOk( validate( template ) );
		template.axes.x = axis;

		axis = template.axes.y;
		template.axes.y = undefined;
		assert.notOk( validate( template ) );
		template.axes.y = axis;
	});

});
