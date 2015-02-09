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

describe( 'interactions', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should not invalidate a chart configuration without an interactions field', function test() {
		template.settings.interactions = undefined;
		assert.ok( validate( template ) );
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
			template.settings.interactions = {};
			template.settings.interactions = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.settings.interactions.brushable = false;
			template.settings.interactions.brushable = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.settings.interactions.brushableRows = false;
			template.settings.interactions.brushableRows = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.settings.interactions.brushableCols = false;
			template.settings.interactions.brushableCols = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.settings.interactions.sortableRows = false;
			template.settings.interactions.sortableRows = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.settings.interactions.sortableCols = false;
			template.settings.interactions.sortableCols = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
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
			template.settings.interactions.resizable = false;
			template.settings.interactions.resizable = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should not require any particular fields', function test() {
		template.settings.interactions = {};
		assert.ok( validate( template ) );
	});

});
