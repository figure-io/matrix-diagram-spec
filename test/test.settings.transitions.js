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

describe( 'transitions', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should not invalidate a chart configuration without a transitions field', function test() {
		template.settings.transitions = undefined;
		assert.ok( validate( template ) );
	});

	it( 'should invalidate a chart configuration with an invalid transitions field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.settings.transitions = {};
			template.settings.transitions = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid transition duration (non-number)', function test() {
		var values = [
			'5',
			true,
			null,
			// NaN, // NOTE: `NaN` is non-JSON compliant; if stringified, `NaN` is converted to `null`
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.settings.transitions.duration = 2500;
			template.settings.transitions.duration = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should not require any particular fields', function test() {
		template.settings.transitions = {};
		assert.ok( validate( template ) );
	});

});
