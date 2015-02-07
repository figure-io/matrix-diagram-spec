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

describe( 'x-brush', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid x-brush (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var brush = template.brushes.x;
		for ( var i = 0; i < values.length; i++ ) {
			template.brushes.x = brush;
			template.brushes.x = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid x-brush data field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var data = template.brushes.x.data;
		for ( var i = 0; i < values.length; i++ ) {
			template.brushes.x.data = data;
			template.brushes.x.data = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate an x-brush which refers to a data source with an invalid name (non-string)', function test() {
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
			template.brushes.x.data.name = '';
			template.brushes.x.data.name = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate an x-brush having a data source with invalid transforms (non-array)', function test() {
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
			template.brushes.x.data.transforms = [{'type':''}];
			template.brushes.x.data.transforms = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate an x-brush with a data source having an invalid transform type (non-string)', function test() {
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
			template.brushes.x.data.transforms[ 0 ].type = '';
			template.brushes.x.data.transforms[ 0 ].type = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should require a `data` field', function test() {
		var val = template.brushes.x.data;
		template.brushes.x.data = undefined;
		assert.notOk( spec.validate( template ) );
		template.brushes.x.data = val;
	});

	it( 'should require a data name', function test() {
		template.brushes.x.data.name = undefined;
		assert.notOk( spec.validate( template ) );
	});

});
