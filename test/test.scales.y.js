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

describe( 'y-scale', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid y-scale field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var scale = template.scales.y;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.y = scale;
			template.scales.y = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid y-scale type (non-string and not `ordinal`)', function test() {
		var values = [
			'beep',
			3,
			true,
			NaN,
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.y.type = 'ordinal';
			template.scales.y.type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid y-scale description (non-string)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.y.description = '';
			template.scales.y.description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid y-scale domain (non-array)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.y.domain = [];
			template.scales.y.domain = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid y-scale range (non-string and not `height`)', function test() {
		var values = [
			'beep',
			3,
			true,
			NaN,
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.y.range = 'height';
			template.scales.y.range = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `type`, `domain`, and `range` fields', function test() {
		template.scales.y.type = undefined;
		assert.notOk( validate( template ) );
		template.scales.y.type = 'ordinal';

		template.scales.y.domain = undefined;
		assert.notOk( validate( template ) );
		template.scales.y.domain = [];

		template.scales.y.range = undefined;
		assert.notOk( validate( template ) );
		template.scales.y.range = 'height';
	});

});
