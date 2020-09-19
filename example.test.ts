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
