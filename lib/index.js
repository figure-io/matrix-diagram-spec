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

var validator = require( 'is-my-json-valid' );


// VALIDATOR //

var validate = validator( require( './schema.json' ) );


// TEMPLATE //

var template = JSON.stringify( require( './template.json' ) );


// TEMPLATE //

/**
* METHOD: template()
*	Returns a new configuration template.
*
* @returns {Object} configuration template
*/
validate.template = function() {
	// Create a fresh copy:
	return JSON.parse( template );
}; // end METHOD template()


// EXPORTS //

module.exports = validate;
