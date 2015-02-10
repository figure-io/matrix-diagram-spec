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

describe( 'legend entry: fillOpacity', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid legend fillOpacity field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var fillOpacity = template.legend.fillOpacity;
		for ( var i = 0; i < values.length; i++ ) {
			template.legend.fillOpacity = fillOpacity;
			template.legend.fillOpacity = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid legend fillOpacity label (non-string)', function test() {
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
			template.legend.fillOpacity.label = '';
			template.legend.fillOpacity.label = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require a `label` field', function test() {
		template.legend.fillOpacity.label = undefined;
		assert.notOk( validate( template ) );
		template.legend.fillOpacity.label = '';
	});

});
