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

describe( 'mark', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a mark with an invalid name (non-string)', function test() {
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
			template.marks[ 0 ].name = '';
			template.marks[ 0 ].name = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid type (non-string and not `rect`)', function test() {
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
			template.marks[ 0 ].type = 'rect';
			template.marks[ 0 ].type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid description (non-string)', function test() {
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
			template.marks[ 0 ].description = '';
			template.marks[ 0 ].description = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid data field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var data = template.marks[ 0 ].data;
		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].data = data;
			template.marks[ 0 ].data = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark which refers to a data source with an invalid name (non-string)', function test() {
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
			template.marks[ 0 ].data.name = '';
			template.marks[ 0 ].data.name = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with invalid transforms (non-array)', function test() {
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
			template.marks[ 0 ].data.transforms = [{'type':''}];
			template.marks[ 0 ].data.transforms = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid transform type (non-string)', function test() {
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
			template.marks[ 0 ].data.transforms[ 0 ].type = '';
			template.marks[ 0 ].data.transforms[ 0 ].type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid properties field (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var props = template.marks[ 0 ].properties;
		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties = props;
			template.marks[ 0 ].properties = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid fill property (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var fill = template.marks[ 0 ].properties.fill;
		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties.fill = fill;
			template.marks[ 0 ].properties.fill = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid fill scale (non-string and not `color`)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			{},
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties.fill.scale = 'color';
			template.marks[ 0 ].properties.fill.scale = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid fill field path (non-string, non-null, and non-numeric)', function test() {
		var values = [
			true,
			// NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties.fill.field = null;
			template.marks[ 0 ].properties.fill.field = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid fillOpacity property (non-object)', function test() {
		var values = [
			5,
			true,
			// null,
			NaN,
			function(){},
			[],
			'beep'
		];

		var opacity = template.marks[ 0 ].properties.fillOpacity;
		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties.fillOpacity = opacity;
			template.marks[ 0 ].properties.fillOpacity = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid fill opacity scale (non-string and not `z`)', function test() {
		var values = [
			5,
			true,
			null,
			NaN,
			function(){},
			[],
			{},
			'beep'
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties.fillOpacity.scale = 'z';
			template.marks[ 0 ].properties.fillOpacity.scale = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a mark with an invalid fill opacity field path (non-string, non-null, and non-numeric)', function test() {
		var values = [
			true,
			// NaN,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.marks[ 0 ].properties.fillOpacity.field = null;
			template.marks[ 0 ].properties.fillOpacity.field = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should require `type`, `data`, and `properties` fields', function test() {
		var val;

		template.marks[ 0 ].type = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].type = 'rect';

		val = template.marks[ 0 ].data;
		template.marks[ 0 ].data = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].data = val;

		val = template.marks[ 0 ].properties;
		template.marks[ 0 ].properties = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].properties = val;
	});

	it( 'should require a data `name`', function test() {
		template.marks[ 0 ].data.name = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].data.name = '';
	});

	it( 'should require `fill` and `fillOpacity` properties', function test() {
		var val;

		val = template.marks[ 0 ].properties.fill;
		template.marks[ 0 ].properties.fill = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].properties.fill = val;

		val = template.marks[ 0 ].properties.fillOpacity;
		template.marks[ 0 ].properties.fillOpacity = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].properties.fillOpacity = val;
	});

	it( 'should require `scale` and `field` properties', function test() {
		var val;

		val = template.marks[ 0 ].properties.fill.scale;
		template.marks[ 0 ].properties.fill.scale = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].properties.fill.scale = val;

		val = template.marks[ 0 ].properties.fill.field;
		template.marks[ 0 ].properties.fill.field = undefined;
		assert.notOk( validate( template ) );
		template.marks[ 0 ].properties.fill.field = val;
	});

});
