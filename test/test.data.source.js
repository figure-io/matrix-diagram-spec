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

describe( 'data source', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a data source with an invalid name (non-string)', function test() {
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
			template.data[ 2 ].name = '';
			template.data[ 2 ].name = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid description (non-string)', function test() {
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
			template.data[ 2 ].description = '';
			template.data[ 2 ].description = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a data source with invalid transforms (non-array)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			'beep',
			[{'foo':'bar'}],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 2 ].transforms = [{'type':''}];
			template.data[ 2 ].transforms = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid transform type (non-string)', function test() {
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
			template.data[ 2 ].transforms[ 0 ].type = '';
			template.data[ 2 ].transforms[ 0 ].type = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid source (non-string)', function test() {
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
			template.data[ 2 ].source = '';
			template.data[ 2 ].source = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should require `name` and `source` fields', function test() {
		template.data[ 2 ].name = undefined;
		assert.notOk( spec.validate( template ) );
		template.data[ 2 ].name = '';

		template.data[ 2 ].source = undefined;
		assert.notOk( spec.validate( template ) );
		template.data[ 2 ].source = '';
	});

});
