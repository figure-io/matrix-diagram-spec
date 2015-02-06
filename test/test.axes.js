/* global describe, it, before, beforeEach, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	spec = require( './../lib' );


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
		assert.notOk( spec.validate( template ) );
		assert.strictEqual( spec.errors().length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid axes field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var axes = template.axes;
		for ( var i = 0; i < values.length; i++ ) {
			template.axes = axes;
			template.axes = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	// TODO: unhide test once IMJV issue #14 resolved
	xit( 'should require `x` and `y` fields', function test() {
		var axis;

		axis = template.axes.x;
		template.axes.x = null;
		assert.notOk( spec.validate( template ) );
		template.axes.x = axis;

		axis = template.axes.y;
		template.axes.y = null;
		assert.notOk( spec.validate( template ) );
		template.axes.y = axis;
	});

});
