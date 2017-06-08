# dot-extract

Extracts properties from an object according to a set of dot-delimited field
specification strings while preserving the structure of the input object.

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
