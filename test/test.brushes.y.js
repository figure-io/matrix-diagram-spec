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

describe( 'y-brush', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid y-brush (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var brush = template.brushes.y;
		for ( var i = 0; i < values.length; i++ ) {
			template.brushes.y = brush;
			template.brushes.y = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid y-brush data field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var data = template.brushes.y.data;
		for ( var i = 0; i < values.length; i++ ) {
			template.brushes.y.data = data;
			template.brushes.y.data = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate an y-brush which refers to a data source with an invalid name (non-string)', function test() {
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
			template.brushes.y.data.name = '';
			template.brushes.y.data.name = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate an y-brush having a data source with invalid transforms (non-array)', function test() {
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
			template.brushes.y.data.transforms = [{'type':''}];
			template.brushes.y.data.transforms = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate an y-brush with a data source having an invalid transform type (non-string)', function test() {
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
			template.brushes.y.data.transforms[ 0 ].type = '';
			template.brushes.y.data.transforms[ 0 ].type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require a `data` field', function test() {
		var val = template.brushes.y.data;
		template.brushes.y.data = undefined;
		assert.notOk( validate( template ) );
		template.brushes.y.data = val;
	});

	it( 'should require a data name', function test() {
		template.brushes.y.data.name = undefined;
		assert.notOk( validate( template ) );
	});

});
