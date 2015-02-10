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

describe( 'z-scale', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration with an invalid z-scale field (non-object)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var scale = template.scales.z;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z = scale;
			template.scales.z = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale type (non-string and not `linear`)', function test() {
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
			template.scales.z.type = 'linear';
			template.scales.z.type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale description (non-string)', function test() {
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
			template.scales.z.description = '';
			template.scales.z.description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale domain (non-object)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			'beep',
			[]
		];

		var domain = template.scales.z.domain;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z.domain = domain;
			template.scales.z.domain = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale min (non-number and non-null)', function test() {
		var values = [
			true,
			// NaN,
			[],
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z.domain.min = null;
			template.scales.z.domain.min = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale max (non-number and non-null)', function test() {
		var values = [
			true,
			// NaN,
			[],
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z.domain.max = null;
			template.scales.z.domain.max = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale range (non-object)', function test() {
		var values = [
			3,
			true,
			NaN,
			null,
			function(){},
			'beep',
			[]
		];

		var range = template.scales.z.range;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z.range = range;
			template.scales.z.range = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale min range (non-number or out of bounds)', function test() {
		var values = [
			-0.1,
			1.1,
			true,
			// NaN,
			[],
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z.range.min = 0;
			template.scales.z.range.min = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a chart configuration with an invalid z-scale max range (non-number or out of bounds)', function test() {
		var values = [
			-0.1,
			1.1,
			true,
			// NaN,
			[],
			function(){},
			'beep',
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.scales.z.range.max = 1;
			template.scales.z.range.max = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `type`, `domain`, and `range` fields', function test() {
		var val;

		template.scales.z.type = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.type = 'linear';

		val = template.scales.z.domain;
		template.scales.z.domain = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.domain = val;

		val = template.scales.z.range;
		template.scales.z.range = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.range = val;
	});

	it( 'should require `min` and `max` domain fields', function test() {
		template.scales.z.domain.min = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.domain.min = null;

		template.scales.z.domain.max = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.domain.max = null;
	});

	it( 'should require `min` and `max` range fields', function test() {
		template.scales.z.range.min = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.range.min = null;

		template.scales.z.range.max = undefined;
		assert.notOk( validate( template ) );
		template.scales.z.range.max = null;
	});

});
