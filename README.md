# jest-each-improved-types
Using recursive conditional types from typescript 4.1 to improve typings of table driven jest-each tests.

```typescript
type Variables = [
  ['note', string],
  ['given', string],
  ['expected', boolean]
]

describe('example test', () => {
  test.each<Variables, 2>`
  note       | given   | expected
  ${'true'}  | ${'ok'} | ${true}
  ${'false'} | ${'Ok'} | ${false}
  `('$note', ({given, expected}) => {
    expect(given === 'ok').toBe(expected);
  });
});
```