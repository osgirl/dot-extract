const assert = require('assert')
const extract = require('./lib.js')

const tests = []

tests.push({
  in: {
    a: {
      a: {
        a: 111,
        b: 112,
      },
      b: {
        a: 'yep',
        b: 'me too',
      },
      c: 13,
    },
    b: {
      a: 21,
      b: 22,
    },
    c: 3,
  },
  spec: [
    'a.a.b',
    'a.b',
    'b.a',
    'c',
  ],
  out: {
    a: {
      a: {
        b: 112,
      },
      b: {
        a: 'yep',
        b: 'me too',
      },
    },
    b: {
      a: 21,
    },
    c: 3,
  },
})

tests.push({
  in: {
    a: [
      {
        a: 111,
        b: 112,
      },
      {
        a: 121,
        b: 122,
      },
    ],
    b: [
      {
        a: [
          {
            a: 21111,
            b: 21112,
          },
          {
            a: 21121,
            b: 21122,
          },
        ],
        b: 'something',
      },
    ],
    c: []
  },
  spec: [
    'a.a',
    'b.a.b',
    'c.a.b',
  ],
  out: {
    a: [
      {
        a: 111,
      },
      {
        a: 121,
      },
    ],
    b: [
      {
        a: [
          {
            b: 21112,
          },
          {
            b: 21122,
          },
        ],
      },
    ],
    c: [],
  },
})

tests.push({
  in: [
    {
      a: 11,
      b: {
        a: 121,
        b: 122,
      },
      c: 13,
    },
    {
      a: 21,
      b: {
        a: 221,
        b: 222,
      },
      c: 23,
    },
  ],
  spec: [
    'b.a',
  ],
  out: [
    {
      b: {
        a: 121,
      },
    },
    {
      b: {
        a: 221,
      },
    },
  ],
})

tests.push({
  in: {
    a: 1,
    b: 2,
    c: 3,
  },
  spec: [
    'x.x.x',
    'a.x.x',
  ],
  out: {
    x: undefined,
    a: {
      x: undefined,
    },
  },
})

tests.push({
  in: {
    a: 1,
    b: 2,
    c: 3,
  },
  spec: [
    '',
    null,
    undefined,
  ],
  out: {
  },
})

for (const test of tests) {
  const out = extract(test.in, test.spec)
  assert.deepStrictEqual(out, test.out)
  console.log('Test passed')
}
