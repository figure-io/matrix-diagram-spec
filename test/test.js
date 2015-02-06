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

var goodConfig = require( './fixtures/good.json' ),
	badConfig = require( './fixtures/bad.json' ),
	tmpl = require( './fixtures/template.json' );


// TESTS //

describe( 'matrix-diagram-spec', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should export an object', function test() {
		expect( spec ).to.be.an( 'object' );
	});

	it( 'should provide a method to create a new configuration template', function test() {
		expect( spec.template ).to.be.a( 'function' );
	});

	it( 'should return a matrix diagram configuration object', function test() {
		var config = spec.template();
		assert.isObject( config );
		assert.isArray( config.data );
		assert.isArray( config.marks );
		assert.isObject( config.scales );
		assert.isObject( config.axes );
		assert.isObject( config.legend );
		assert.isObject( config.interactions );
		assert.isObject( config.transitions );
	});

	it( 'should provide a method to validate a chart configuration', function test() {
		expect( spec.validate ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a chart configuration which is not an object', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				spec.validate( value );
			};
		}
	});

	it( 'should provide a method to access the most recent validation errors', function test() {
		expect( spec.errors ).to.be.a( 'function' );
	});

	it( 'should properly validate chart configurations', function test() {
		var isValid;

		// Good configuration:
		isValid = spec.validate( goodConfig );
		assert.ok( isValid );

		// Bad configuration:
		isValid = spec.validate( badConfig );
		assert.notOk( isValid );
	});

});
