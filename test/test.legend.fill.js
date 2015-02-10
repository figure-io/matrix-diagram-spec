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

describe( 'legend entry: fill', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid legend fill field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var fill = template.legend.fill;
		for ( var i = 0; i < values.length; i++ ) {
			template.legend.fill = fill;
			template.legend.fill = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid legend fill label (non-string)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.legend.fill.label = '';
			template.legend.fill.label = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require a `label` field', function test() {
		template.legend.fill.label = undefined;
		assert.notOk( validate( template ) );
		template.legend.fill.label = '';
	});

});
