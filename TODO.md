TODO
====

1. cli
	-	schema in, validate out
	-	modes
		-	isValid out
		-	errors out
		-	if pass, then schema out (could then pipe to next command; e.g., generate figure, which is then piped to disk as a png)
	- 	example pipeline
		-	data
		-	inline data in config
		-	validate config (which includes ensuring data is in right format)
		-	if valid, to generate figure
		-	figure to frontend; e.g., as static file, to browser, etc)
	- 	e.g., browser frontend
		-	pipe to node app
		-	creates server, bound to random port
		-	launches chrome and opens server url
		-	
2. update descriptions (use `schema` keyword, rather than specifies)
3. figure out what to do about the color scale
	-	how actually implemented in the polymer component
4. monitor IMJV [issue #14](https://github.com/mafintosh/is-my-json-valid/issues/14)
5. 
6. 
7. possibly relax the requirements (e.g., transitions, legend, interactions, settings, brushes, name)
	-	what are the core elements which are needed?
	-	how does this fit in with the `config` method?
		-	stipulate that a partial object be merged with a spec template
		-	could handle this internally; always merge and then validate. +1
8. 
9. 
10. should a `title` field be required in `meta`?
11. should `interactions` and `transitions` be placed under `settings`? 
	- 	Yes, as really these will be generator specific
	-	where do we put brushes?
		-	maybe under settings; brushable rows/cols can be inferred based on existence of brushes
		-	`brushableRows: {...}`
		- 	if `null`, `false`, or absent, then no brush element
		- 	probably be better if brushes were own separate specification, as these may be considered essential data elements, even if not interactive (e.g., in providing context; e.g., with timeseries)
12. 
13. brushes can be more than just `x` and `y`. Generators/bespoke diagrams could implement others.
14. 


### Tests

1. commented out `null` values --> IMJV issue #14
2. 


### Notes

1. Mandatory config: what would be the minimal amt of config someone would need to know to create a static graphic which is visually encoded the same?
	-	canvas.width
	-	canvas.height
	-	canvas.padding (all)
	-	scales.x
	- 	scales.y
	-	scales.z
	-	scales.color
	-	axes.x
	-	axes.y
	-	data
	-	marks
	-	marks[0].type
	-	marks[0].data.name
	-	marks[0].properties.fill
	-	marks[0].properties.fillOpacity
	-	type (matrix-diagram)
	-	legend.fill
	-	legend.fillOpacity
2. Should `axes` just be an `object`?
	-	if a chart supports multiple x/y axes, then those axes should be namespaced accordingly; e.g., x1,x2,x3,x4,...,etc. The key name could be just as easily parsed to get the axis type, as reading the `type` key for each array element
