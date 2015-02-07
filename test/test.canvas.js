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

describe( 'canvas', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a canvas field', function test() {
		template.canvas = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid canvas field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var canvas = template.canvas;
		for ( var i = 0; i < values.length; i++ ) {
			template.canvas = canvas;
			template.canvas = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid canvas width (non-positive integer and non-null)', function test() {
		var values = [
			'5',
			3.14,
			true,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.width = 0;
			template.canvas.width = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid canvas height (non-positive integer and non-null)', function test() {
		var values = [
			'5',
			3.14,
			true,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.height = 0;
			template.canvas.height = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid padding field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var padding = template.canvas.padding;
		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.padding = padding;
			template.canvas.padding = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid left padding (non-positive integer and non-null)', function test() {
		var values = [
			'5',
			3.14,
			true,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.padding.left = 0;
			template.canvas.padding.left = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid right padding (non-positive integer and non-null)', function test() {
		var values = [
			'5',
			3.14,
			true,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.padding.right = 0;
			template.canvas.padding.right = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid bottom padding (non-positive integer and non-null)', function test() {
		var values = [
			'5',
			3.14,
			true,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.padding.bottom = 0;
			template.canvas.padding.bottom = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid top padding (non-positive integer and non-null)', function test() {
		var values = [
			'5',
			3.14,
			true,
			NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.canvas.padding.top = 0;
			template.canvas.padding.top = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `width`, `height`, and `padding` fields', function test() {
		template.canvas.width = undefined;
		assert.notOk( validate( template ) );
		template.canvas.width = null;

		template.canvas.height = undefined;
		assert.notOk( validate( template ) );
		template.canvas.height = null;

		template.canvas.padding = undefined;
		assert.notOk( validate( template ) );
		template.canvas.padding = null;
	});

	it( 'should require `left`, `right`, `top`, and `bottom` padding fields', function test() {
		template.canvas.padding.left = undefined;
		assert.notOk( validate( template ) );
		template.canvas.padding.left = null;

		template.canvas.padding.right = undefined;
		assert.notOk( validate( template ) );
		template.canvas.padding.right = null;

		template.canvas.padding.top = undefined;
		assert.notOk( validate( template ) );
		template.canvas.padding.top = null;

		template.canvas.padding.bottom = undefined;
		assert.notOk( validate( template ) );
		template.canvas.padding.bottom = null;
	});

});
