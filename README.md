# jest-each-improved-types
[![npm version](https://badge.fury.io/js/%40wistudent%2Fjest-each-improved-types.svg)](https://badge.fury.io/js/%40wistudent%2Fjest-each-improved-types)

Using recursive conditional types from typescript 4.1 to improve typings of table driven jest-each tests.

## Installation
`npm install -D @wistudent/jest-each-improved-types`

Add it to your tsconfig.json
```json
{
  ...
  "typeRoots": [
    "node_modules/@types",
    "node_modules/@wistudent/jest-each-improved-types"
  ]
} 
```

## Usage

```typescript
type Variables = [
  ['note', string],
  ['given', string],
  ['expected', boolean]
]

test.each<Variables, 2>`
note       | given   | expected
${'true'}  | ${'ok'} | ${true}
${'false'} | ${'Ok'} | ${false}
`('$note', ({given, expected}) => {
  expect(given === 'ok').toBe(expected);
});
```