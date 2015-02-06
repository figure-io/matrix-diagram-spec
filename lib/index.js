/**
*
*	MATRIX-DIAGRAM-SPEC
*
*
*	DESCRIPTION:
*		- JSON specification and validation for matrix diagrams.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var validator = require( 'is-my-json-valid/require' );


// VALIDATOR //

var validate = validator( './schema.json' );


// TEMPLATE //

var template = JSON.stringify( require( './template.json' ) );


// SPEC //

var spec = {};

/**
* METHOD: template()
*	Returns a new configuration template.
*
* @returns {Object} configuration template
*/
spec.template = function() {
	// Create a fresh copy:
	return JSON.parse( template );
}; // end METHOD template()

/**
* METHOD: validate( config )
*	Validates if a chart configuration conforms to the specification.
*
* @param {Object} config - chart configuration
* @returns {Boolean} boolean indicating if the configuration is valid
*/
spec.validate = function( config ) {
	if ( typeof config !== 'object' || config === null || Array.isArray( config ) ) {
		throw new TypeError( 'validate()::invalid input argument. Must provide a configuration object. Value: `' + config + '`.' );
	}
	return validate( config );
}; // end METHOD validate()

/**
* METHOD: errors()
*	Returns a list of the most recent validation errors.
*
* @returns {Array} array of errors
*/
spec.errors = function() {
	return validate.errors;
}; // end METHOD errors()


// EXPORTS //

module.exports = spec;
