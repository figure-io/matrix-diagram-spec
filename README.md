Matrix Diagram Specification
====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> JSON specification and validation for [matrix diagrams](https://github.com/figure-io/polymer-matrix-diagram).


### Specification

For specification documentation, consult the [wiki](https://github.com/figure-io/matrix-diagram-spec/wiki).



### Installation

``` bash
$ npm install matrix-diagram-spec
```


### Usage

``` javascript
var validate = require( 'matrix-diagram-spec' );
```

The validator has the following attributes and methods...


<a name="method-validate"></a>
#### validate( config )

Validates if a configuration object conforms to the [matrix diagram specification](https://github.com/figure-io/matrix-diagram-spec/wiki).

``` javascript
var chart = {
	"name": "Awesome configuration.",
	"meta": {
		"title": "My Diagram",
		"description": "An awesome matrix diagram."
	},
	"data": {
		"name": "awesome-data",
		"rownames": [...],
		"colnames": [...],
		"values": [[],[]]
	},
	...
};

var isValid = validate( chart );
// returns `boolean`
```

<a name="method-template"></a>
#### validate.template()

Returns a new [matrix diagram](https://github.com/figure-io/polymer-matrix-diagram) template.

``` javascript
var template = validate.template();
// returns {...}
```

Modify the template to generate your desired chart configuration. Once configured, the configuration object should be validated.


<a name="attr-errors"></a>
#### validate.errors

An `array` of errors from the most recent validation. If no errors occurred during validation, the list is `null`.

``` javascript
var errs = validator.errors;
```


### Examples

``` javascript
var validate = require( 'matrix-diagram-spec' ),
	goodChart,
	badChart,
	isValid,
	tmpl;

// Load in our chart configurations...
goodChart = require( './examples/good.json' );
badChart = require( './examples/bad.json' );

// Validate:
isValid = validate( goodChart );
console.log( validate.errors );

isValid = validate( badChart );
console.dir( validate.errors );

// Create a new configuration from a template:
tmpl = validate.template();

tmpl.name = 'Beep';
tmpl.data.name = 'boop';
tmpl.data.rownames = [ 'foo', 'bar' ];
tmpl.data.colnames = [ 'baz', 'bop' ];
tmpl.data.values = [
	[ 
		{ 'a': 1, 'b': 0.56 },
		{ 'a': 0, 'b': 0.79 }
	],
	[ 
		{ 'a': 0, 'b': 0.99 },
		{ 'a': 1, 'b': 0.12 }
	]
];
tmpl.canvas.width = 600;
tmpl.canvas.height = 400;
tmpl.axes.x.label = 'Columns';
tmpl.axes.y.label = 'Rows';
tmpl.marks[ 0 ].data.name = 'boop';
tmpl.marks[ 0 ].properties.fill.field = 'a';
tmpl.marks[ 0 ].properties.fillOpacity.field = 'b';
tmpl.interactions.brushable = true;
tmpl.interactions.sortableRows = true;
tmpl.interactions.sortableCols = false;

isValid = validate( tmpl );
console.log( validate.errors );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```

---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.



[npm-image]: http://img.shields.io/npm/v/matrix-diagram-spec.svg
[npm-url]: https://npmjs.org/package/matrix-diagram-spec

[travis-image]: http://img.shields.io/travis/figure-io/matrix-diagram-spec/master.svg
[travis-url]: https://travis-ci.org/figure-io/matrix-diagram-spec

[coveralls-image]: https://img.shields.io/coveralls/figure-io/matrix-diagram-spec/master.svg
[coveralls-url]: https://coveralls.io/r/figure-io/matrix-diagram-spec?branch=master

[dependencies-image]: http://img.shields.io/david/figure-io/matrix-diagram-spec.svg
[dependencies-url]: https://david-dm.org/figure-io/matrix-diagram-spec

[dev-dependencies-image]: http://img.shields.io/david/dev/figure-io/matrix-diagram-spec.svg
[dev-dependencies-url]: https://david-dm.org/dev/figure-io/matrix-diagram-spec

[github-issues-image]: http://img.shields.io/github/issues/figure-io/matrix-diagram-spec.svg
[github-issues-url]: https://github.com/figure-io/matrix-diagram-spec/issues
