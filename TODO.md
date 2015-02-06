TODO
====

1. cli
2. update descriptions (use `schema` keyword, rather than specifies)
3. figure out what to do about the color scale
	-	how actually implemented in the polymer component
4. monitor IMJV [issue #14](https://github.com/mafintosh/is-my-json-valid/issues/14)
5. ToC
6. README specification
7. possibly relax the requirements (e.g., transitions, legend, interactions, settings, brushes, name)
	-	what are the core elements which are needed?
	-	how does this fit in with the `config` method?
		-	stipulate that a partial object be merged with a spec template
		-	could handle this internally; always merge and then validate. +1
8. Should `axes` just be an `object`?
	-	if a chart supports multiple x/y axes, then those axes should be namespaced accordingly; e.g., x1,x2,x3,x4,...,etc. The key name could be just as easily parsed to get the axis type, as reading the `type` key for each array element
9. Can a list of possible keys be enumerated? `enum` in the schema.
	-	e.g., for axes, want only `x` and `y` keys
	-	`additionalProperties:false`
	-	`minProperties:2`
	-	`maxProperties:2`
10. should a `title` field be required in `meta`?
11. 


### Tests

1. scales
2. axes
	- `test.axes.js`: issue #14
3. marks
4. brushes
5. legend
