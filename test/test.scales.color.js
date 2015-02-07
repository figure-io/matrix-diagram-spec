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

describe( 'color-scale', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid color-scale field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var scale = template.scales.color;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color = scale;
			template.scales.color = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale type (non-string and not `ordinal`)', function test() {
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
			template.scales.color.type = 'ordinal';
			template.scales.color.type = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale description (non-string)', function test() {
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
			template.scales.color.description = '';
			template.scales.color.description = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale domain (non-object)', function test() {
		var values = [
			3,
			true,
			NaN,
			// null,
			function(){},
			'beep',
			[]
		];

		var domain = template.scales.color.domain;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.domain = domain;
			template.scales.color.domain = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale min (non-number and non-null)', function test() {
		var values = [
			true,
			// NaN,
			[],
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.domain.min = null;
			template.scales.color.domain.min = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale max (non-number and non-null)', function test() {
		var values = [
			true,
			// NaN,
			[],
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.domain.max = null;
			template.scales.color.domain.max = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid color-scale range (non-array)', function test() {
		var values = [
			3,
			true,
			NaN,
			// null,
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.color.range = [];
			template.scales.color.range = values[ i ];
			assert.notOk( spec.validate( template ) );
			assert.strictEqual( spec.errors().length, 1 );
		}
	});

	it( 'should require `type`, `domain`, and `range` fields', function test() {
		var val;

		template.scales.color.type = undefined;
		assert.notOk( spec.validate( template ) );
		template.scales.color.type = 'ordinal';

		val = template.scales.color.domain;
		template.scales.color.domain = undefined;
		assert.notOk( spec.validate( template ) );
		template.scales.color.domain = val;

		template.scales.color.range = undefined;
		assert.notOk( spec.validate( template ) );
		template.scales.color.range = [];
	});

	it( 'should require `min` and `max` domain fields', function test() {
		template.scales.color.domain.min = undefined;
		assert.notOk( spec.validate( template ) );
		template.scales.color.domain.min = null;

		template.scales.color.domain.max = undefined;
		assert.notOk( spec.validate( template ) );
		template.scales.color.domain.max = null;
	});

});
