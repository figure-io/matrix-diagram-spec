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

describe( 'data inline', function tests() {

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
			template.data[ 0 ].name = '';
			template.data[ 0 ].name = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.data[ 0 ].description = '';
			template.data[ 0 ].description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with invalid row names (non-array)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 0 ].rownames = [];
			template.data[ 0 ].rownames = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with invalid column names (non-array)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 0 ].colnames = [];
			template.data[ 0 ].colnames = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a data source with invalid values (non-array of arrays)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			'beep',
			[],
			[ 'beep' ],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.data[ 0 ].values = [[]];
			template.data[ 0 ].values = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.data[ 0 ].transforms = [{'type':''}];
			template.data[ 0 ].transforms = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.data[ 0 ].transforms[ 0 ].type = '';
			template.data[ 0 ].transforms[ 0 ].type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `name`, `rownames`, `colnames`, and `values` fields', function test() {
		template.data[ 0 ].name = undefined;
		assert.notOk( validate( template ) );
		template.data[ 0 ].name = '';

		template.data[ 0 ].rownames = undefined;
		assert.notOk( validate( template ) );
		template.data[ 0 ].rownames = [];

		template.data[ 0 ].colnames = undefined;
		assert.notOk( validate( template ) );
		template.data[ 0 ].colnames = [];

		template.data[ 0 ].values = undefined;
		assert.notOk( validate( template ) );
		template.data[ 0 ].values = [[]];
	});

});
