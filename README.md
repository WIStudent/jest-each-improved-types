# jest-each-improved-types
[![npm version](https://badge.fury.io/js/%40wistudent%2Fjest-each-improved-types.svg)](https://badge.fury.io/js/%40wistudent%2Fjest-each-improved-types)

Using recursive conditional types from typescript 4.1 to improve typings of table driven jest-each tests.

## Installation
`npm install -D @wistudent/jest-each-improved-types`


## Usage

```typescript
import {it, each} from "@wistudent/jest-each-improved-types"

type Variables = [
  ['note', string],
  ['given', string],
  ['expected', boolean]
]

// using test
test.each<Variables, 2>`
note       | given   | expected
${'true'}  | ${'ok'} | ${true}
${'false'} | ${'Ok'} | ${false}
`('$note', ({given, expected}) => {
  expect(given === 'ok').toBe(expected);
});

// using it
it.each<Variables, 2>`
note       | given   | expected
${'true'}  | ${'ok'} | ${true}
${'false'} | ${'Ok'} | ${false}
`('$note', ({given, expected}) => {
  expect(given === 'ok').toBe(expected);
});
```