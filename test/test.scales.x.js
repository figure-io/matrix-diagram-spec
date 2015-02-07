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

describe( 'x-scale', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid x-scale field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var scale = template.scales.x;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.x = scale;
			template.scales.x = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid x-scale type (non-string and not `ordinal`)', function test() {
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
			template.scales.x.type = 'ordinal';
			template.scales.x.type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid x-scale description (non-string)', function test() {
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
			template.scales.x.description = '';
			template.scales.x.description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid x-scale domain (non-array)', function test() {
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
			template.scales.x.domain = [];
			template.scales.x.domain = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid x-scale range (non-string and not `width`)', function test() {
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
			template.scales.x.range = 'width';
			template.scales.x.range = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `type`, `domain`, and `range` fields', function test() {
		template.scales.x.type = undefined;
		assert.notOk( validate( template ) );
		template.scales.x.type = 'ordinal';

		template.scales.x.domain = undefined;
		assert.notOk( validate( template ) );
		template.scales.x.domain = [];

		template.scales.x.range = undefined;
		assert.notOk( validate( template ) );
		template.scales.x.range = 'width';
	});

});
