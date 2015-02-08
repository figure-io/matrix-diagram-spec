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

describe( 'legend', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a legend field', function test() {
		template.legend = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid legend field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var legend = template.legend;
		for ( var i = 0; i < values.length; i++ ) {
			template.legend = legend;
			template.legend = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `fill` and `fillOpacity` fields', function test() {
		var entry;

		entry = template.legend.fill;
		template.legend.fill = undefined;
		assert.notOk( validate( template ) );
		template.legend.fill = entry;

		entry = template.legend.fillOpacity;
		template.legend.fill = undefined;
		assert.notOk( validate( template ) );
		template.legend.fillOpacity = entry;
	});

});
