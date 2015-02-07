Matrix Diagram Specification
====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> JSON specification and validation for [matrix diagrams](https://github.com/figure-io/polymer-matrix-diagram).

---
1. 	[Installation](#installation)
1. 	[Usage](#usage)
	- 	[Examples](#usage-examples)
1. 	[Specification](#specification)
	-	[Examples](#spec-examples)
1. 	[Tests](#tests)
	-	[Unit](#unit)
	-	[Coverage](#test-coverage)
1. 	[License](#license)


---
### Installation

``` bash
$ npm install matrix-diagram-spec
```

### Usage

``` javascript
var validate = require( 'matrix-diagram-spec' );
```

The specification has the following attributes and methods...


<a name="method-validate"></a>
#### validate( config )

Validates if a configuration object conforms to the [matrix diagram](https://github.com/figure-io/polymer-matrix-diagram) specification.

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


<a name="usage-examples"></a>
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
## Specification

All fields are mandatory unless stated otherwise.

``` javascript
var spec = {
	"name": "{{ chart_name }}",
	"type": "matrix-diagram",
	"meta": {
		"title": "{{ chart_title }}",
		"description": "{{ chart_description }}"
	},
	"data": [
		{
			"name": "{{ data_name }}",
			"description": "{{ data_description }}",
			"rownames": [],
			"colnames": [],
			"values": [[]],
			"transforms": [
				{
					"type": "{{ transform_type }}"
				}
			]
		},
		{
			"name": "{{ data_name }}",
			"description": "{{ data_description }}",
			"url": "{{ url }}",
			"format": {
				"type": "{{ json | csv | tsv }}",
				"fields": {
					"rownames": "{{ json_path }}",
					"colnames": "{{ json_path }}",
					"values": "{{ json_path }}"
				}
			},
			"transforms": [
				{
					"type": "{{ transform_type }}"
				}
			]
		},
		{
			"name": "{{ data_name }}",
			"description": "{{ data_description }}",
			"source": "{{ source_data_name }}",
			"transforms": [
				{
					"type": "{{ transform_type }}"
				}
			]
		}
	],
	"canvas": {
		"width": null,
		"height": null,
		"padding": {
			"left": null,
			"right": null,
			"top": null,
			"bottom": null
		}
	},
	"scales": {
		"x": {
			"type": "ordinal",
			"description": "{{ domain is an array of indices specifying the column order }}",
			"domain": [],
			"range": "width"
		},
		"y": {
			"type": "ordinal",
			"description": "{{ domain is an array of indices specifying the row order }}",
			"domain": [],
			"range": "height"
		},
		"z": {
			"type": "linear",
			"description": "{{ maps data values to fill-opacity }}",
			"domain": {
				"min": null,
				"max": null
			},
			"range": {
				"min": 0,
				"max": 1
			}
		},
		"color": {
			"type": "ordinal",
			"description": "{{ maps data values to colors }}",
			"domain": {
				"min": null,
				"max": null
			},
			"range": []
		}
	},
	"axes": {
		"x": {
			"scale": "x",
			"label": "{{ x-label }}"
		},
		"y": {
			"scale": "y",
			"label": "{{ y-label }}"
		}
	},
	"marks": [
		{
			"name": "{{ mark_name }}",
			"type": "rect",
			"description": "{{ marks_desc }}",
			"data": {
				"name": "{{ data_name }}",
				"transforms": [
					{
						"type": "{{ transform_type }}"
					}
				]
			},
			"properties": {
				"fill": {
					"scale": "color",
					"field": "{{ field_name }}"
				},
				"fillOpacity": {
					"scale": "z",
					"field": "{{ field_name }}"
				}
			}
		}
	],
	"brushes": {
		"x": {
			"data": {
				"name": "{{ data_name }}",
				"transforms": [
					{
						"type": "{{ transform_type }}"
					}
				]
			}
		},
		"y": {
			"data": {
				"name": "{{ data_name }}",
				"transforms": [
					{
						"type": "{{ transform_type }}"
					}
				]
			}
		}
	},
	"legend": {
		"fill": {
			"label": "{{ entry_label }}"
		},
		"fillOpacity": {
			"label": "{{ entry_label }}"
		}
	},
	"transitions": {
		"duration": 2500
	},
	"interactions": {
		"brushable": false,
		"brushableRows": false,
		"brushableCols": false,
		"sortableRows": false,
		"sortableCols": false,
		"resizable": false
	},
	"settings": {
		"autoResize": true,
		"autoUpdate": true
	}
};
```


#### spec.name

A unique chart specification `name`. The value should be a `string` and should serve as a unique identifier for the specification.

``` javascript
spec.name = 'matrix-diagram-1234';
```

TODO: consider replacing this with `id`.


#### spec.type

The chart specification `type`. The only accepted value for a matrix diagram specification is `matrix-diagram`. Providing this field unambiguously indicates that the specification applies to matrix diagrams.

``` javascript
spec.type = 'matrix-diagram';
```


#### spec.meta

The `meta` field includes any information associated with a matrix diagram that is not essential for understanding the diagram itself. For example, a diagram `title` and `description`, while possibly useful in placing the diagram in context, are not essential for reading and understanding the diagram.


#### spec.meta.title

[__optional__] The matrix diagram `title`. The value should be a `string`. 

``` javascript
spec.meta.title = 'My Matrix Diagram';
```

Note: as the chart `title` is optional, a matrix diagram generator may choose not to support its inclusion in the generated graphic.


#### spec.meta.description

[__optional__] A description of the diagram and its contents. A common use for the description would be as a figure caption. The value should be a `string`.

``` javascript
spec.meta.description = 'This diagram provides an alternative to force diagrams when displaying network data.';
```

Note: as the chart `description` is optional, a matrix diagram generator may choose not to support its inclusion in the generated graphic.


#### spec.data

The `data` field specifies the data sources from which to generate the matrix diagram. The specification may include multiple data sources, each of a different type.



<a name="spec-examples"></a>
### Examples

``` javascript

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

Copyright &copy; 2014. Athan Reines.



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
