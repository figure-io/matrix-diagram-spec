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

describe( 'interactions', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a interactions field', function test() {
		template.interactions = undefined;
		assert.notOk( spec.validate( template ) );
		assert.strictEqual( spec.errors().length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid interactions field (non-object)', function test() {
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
			template.interactions = {};
			template.interactions = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid brushable setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.interactions.brushable = '';
			template.interactions.brushable = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid brushableRows setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.interactions.brushableRows = '';
			template.interactions.brushableRows = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid brushableCols setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.interactions.brushableCols = '';
			template.interactions.brushableCols = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid sortableRows setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.interactions.sortableRows = '';
			template.interactions.sortableRows = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid sortableCols setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.interactions.sortableCols = '';
			template.interactions.sortableCols = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid resizable setting (non-boolean)', function test() {
		var values = [
			5,
			'true',
			null,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.interactions.resizable = '';
			template.interactions.resizable = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should not require any particular interaction settings', function test() {
		template.interactions = {};
		assert.ok( spec.validate( template ) );
	});

});
