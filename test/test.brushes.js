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

describe( 'brushes', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should not invalidate a chart configuration without a brushes field', function test() {
		template.brushes = undefined;
		assert.ok( validate( template ) );
	});

	it( 'should invalidate a chart configuration with an invalid brushes field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var brushes = template.brushes;
		for ( var i = 0; i < values.length; i++ ) {
			template.brushes = brushes;
			template.brushes = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should not require `x` and `y` fields', function test() {
		template.brushes = {};
		assert.ok( validate( template ) );
	});

});
