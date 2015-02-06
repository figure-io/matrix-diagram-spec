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

describe( 'meta', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a meta field', function test() {
		template.meta = undefined;
		assert.notOk( spec.validate( template ) );
		assert.strictEqual( spec.errors().length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid meta field (non-object)', function test() {
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
			template.meta = {};
			template.meta = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid chart title (non-string)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.meta.title = '';
			template.meta.title = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid chart description (non-string)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.meta.description = '';
			template.meta.description = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should not require either a chart title or description', function test() {
		template.meta.title = undefined;
		template.meta.description = undefined;
		assert.ok( spec.validate( template ) );
	});

});
