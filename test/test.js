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

var goodConfig = require( './fixtures/good.json' ),
	badConfig = require( './fixtures/bad.json' ),
	tmpl = require( './fixtures/template.json' ),
	minimal = require( './fixtures/minimal.json' );


// TESTS //

describe( 'matrix-diagram-spec', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should provide a method to create a new configuration template', function test() {
		expect( validate.template ).to.be.a( 'function' );
	});

	it( 'should return a matrix diagram configuration object', function test() {
		var config = validate.template();
		assert.isObject( config );
		assert.isString( config.name );
		assert.isString( config.type );
		assert.strictEqual( config.type, 'matrix-diagram' );
		assert.isArray( config.data );
		assert.isObject( config.canvas );
		assert.isObject( config.scales );
		assert.isObject( config.axes );
		assert.isArray( config.marks );
		assert.isObject( config.legend );
	});

	it( 'should properly validate chart configurations', function test() {
		var isValid;

		// Good configuration:
		isValid = validate( goodConfig );
		assert.ok( isValid );

		// Bad configuration:
		isValid = validate( badConfig );
		assert.notOk( isValid );
	});

	it( 'should validate a minimal chart configuration', function test() {
		assert.ok( validate( minimal ) );
	});

});
