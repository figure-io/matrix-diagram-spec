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

describe( 'data url', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a data source with an invalid name', function test() {
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
			template.data[ 1 ].name = '';
			template.data[ 1 ].name = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid description', function test() {
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
			template.data[ 1 ].description = '';
			template.data[ 1 ].description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with invalid transforms', function test() {
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
			template.data[ 1 ].transforms = [{'type':''}];
			template.data[ 1 ].transforms = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid transform type', function test() {
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
			template.data[ 1 ].transforms[ 0 ].type = '';
			template.data[ 1 ].transforms[ 0 ].type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid url', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			{},
			'3434093284.333.dkjd.2330',
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 1 ].url = '';
			template.data[ 1 ].url = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid format', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var fmt = template.data[ 1 ].format;
		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 1 ].format = fmt;
			template.data[ 1 ].format = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid format type', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			{},
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 1 ].format.type = 'json';
			template.data[ 1 ].format.type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid format fields', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var fields = template.data[ 1 ].format.fields;
		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 1 ].format.fields = fields;
			template.data[ 1 ].format.fields = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid format rownames field', function test() {
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
			template.data[ 1 ].format.fields.rownames = '';
			template.data[ 1 ].format.fields.rownames = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid format colnames field', function test() {
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
			template.data[ 1 ].format.fields.colnames = '';
			template.data[ 1 ].format.fields.colnames = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with an invalid format values field', function test() {
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
			template.data[ 1 ].format.fields.values = '';
			template.data[ 1 ].format.fields.values = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `name` and `url` fields', function test() {
		template.data[ 1 ].name = undefined;
		assert.notOk( validate( template ) );
		template.data[ 1 ].name = '';

		template.data[ 1 ].url = undefined;
		assert.notOk( validate( template ) );
		template.data[ 1 ].url = 'http://127.0.0.1';
	});

	it( 'should require a format type', function test() {
		template.data[ 1 ].format.type = undefined;
		assert.notOk( validate( template ) );
	});

});
