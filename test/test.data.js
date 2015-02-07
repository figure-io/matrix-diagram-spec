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

describe( 'data', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a data field', function test() {
		template.data = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid data field (non-array)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			{},
			'beep'
		];

		var data = template.data;
		for ( var i = 0; i < values.length; i++ ) {
			template.data = data;
			template.data = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration without at least one data source', function test() {
		template.data = [];
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

});
