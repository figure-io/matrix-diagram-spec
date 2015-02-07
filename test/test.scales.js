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

describe( 'scales', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a chart configuration without a scales field', function test() {
		template.scales = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a chart configuration with an invalid scales field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var scales = template.scales;
		for ( var i = 0; i < values.length; i++ ) {
			template.scales = scales;
			template.scales = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	// TODO: unhide test once IMJV issue #14 resolved
	xit( 'should require `x`, `y`, `z`, and `color` fields', function test() {
		var scale;

		scale = template.scales.x;
		template.scales.x = null;
		assert.notOk( validate( template ) );
		template.scales.x = scale;

		scale = template.scales.y;
		template.scales.y = null;
		assert.notOk( validate( template ) );
		template.scales.y = scale;

		scale = template.scales.z;
		template.scales.z = null;
		assert.notOk( validate( template ) );
		template.scales.z = scale;

		scale = template.scales.color;
		template.scales.color = null;
		assert.notOk( validate( template ) );
		template.scales.color = scale;
	});

});
