# jest-each-improved-types
[![npm version](https://badge.fury.io/js/%40wistudent%2Fjest-each-improved-types.svg)](https://badge.fury.io/js/%40wistudent%2Fjest-each-improved-types)

When using `.each` with the table notation, it is possible to set the type of the test function argument on the `.each` function as a generic argument:
```ts
import {test, expect} from "@jest/globals";

test.each<{a: string, b: number, expected: boolean}>`
a      | b    | expected
${'1'} | ${1} | ${true}
${'1'} | ${2} | ${false}
`('some test', ({a, b, expected}) => {
  expect(a === `${b}`).toBe(expected)
});
```

But this only sets the type for the test function argument, it does not ensure that the correct values were used inside the table. The following does not result in a typescript error:
```ts
import {test, expect} from "@jest/globals";

test.each<{a: string, b: number, expected: boolean}>`
a            | b     | expected
${undefined} | ${{}} | ${null}
`('some test', ({a, b, expected}) => {
  expect(a === `${b}`).toBe(expected)
});
```

This package adds an additional way of providing type definitons to `.each` table tests that ensures that the values used inside the table are compatible with the provided typescript types. It does by reexporting `@jest/globals` and extending the type definition of the `.each` function.

```ts
import {test, expect} from "@wistudent/jest-each-improved-types"

test.each<[['a', string], ['b', number], ['expected', boolean]], 2>`
a      | b    | expected
${'1'} | ${1} | ${true}
${'1'} | ${2} | ${false}
`('some test', ({a, b, expected}) => {
  expect(a === `${b}`).toBe(expected)
});
```

Instead of using an interface as the generic argument, a tuple of Key-Type pairs and the number of rows is used. Using a value with the wrong type inside the table, or the number of values not being (*Number of Key-Type pairs* * *Declared number of rows*), will result in a typescript error.
