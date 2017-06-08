# dot-extract

Extracts properties from an object according to a set of dot-delimited field
specification strings while preserving the structure of the input object.

## API

### extract(input, specifications)

Extracts fields from input based on the specification strings.

* `input` is an object or an array of objects from which to extract fields
* `specifications` is an array of strings that specify which fields should be
  extracted

If `input` is an array, an array of transformed objects will be returned.
Otherwise, the transformed object is returned.

Make use of the `input` array overload to avoid unnecessarily preprocessing the
specifications multiple times.

## Example

```
const extract = require('dot-extract')
const assert = require('assert')

const input = {
  name: {
    first: 'Foo',
    initial: 'X',
    last: 'Bar',
  },
  pets: [
    {
      name: 'Doggy',
      type: 'dog',
      age: 2,
    },
    {
      name: 'Kitty',
      type: 'cat',
      age: 5,
    },
  ],
}

const specification = [
  'name.first',
  'name.last',
  'pets.name',
]

const actual = extract(input, specification)

const expected = {
  name: {
    first: 'Foo',
    last: 'Bar',
  },
  pets: [
    {
      name: 'Doggy',
    },
    {
      name: 'Kitty',
    },
  ],
}

assert.deepStrictEqual(actual, expected)
```
