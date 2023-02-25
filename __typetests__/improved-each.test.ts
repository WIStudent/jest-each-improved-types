import {expectError, expectType} from 'tsd-lite';
import {describe, test} from '..';

// Expect corret types in callback function
expectType<void>(
  test.each<[['a', string], ['b', number], ['expected', boolean]], 2>`
    a      | b    | expected
    ${'1'} | ${1} | ${true}
    ${'1'} | ${2} | ${false}
  `(
    'some test',
    ({a, b, expected}) => {
      expectType<string>(a);
      expectType<number>(b);
      expectType<boolean>(expected);
    },
    1000,
  ),
);

// Expect correct types in table
expectError(
  test.each<[['a', string]], 1>`
    a
    ${1}
  `('some test', () => {}, 1000),
);

// Expect correct number of values in table
expectError(
  test.each<[['a', number]], 2>`
    a
    ${1}
  `('some test', () => {}, 1000),
);

// Expect corret types in callback function
expectType<void>(
  test.concurrent.each<
    [['a', string], ['b', number], ['expected', boolean]],
    2
  >`
    a      | b    | expected
    ${'1'} | ${1} | ${true}
    ${'1'} | ${2} | ${false}
  `(
    'some test',
    async ({a, b, expected}) => {
      expectType<string>(a);
      expectType<number>(b);
      expectType<boolean>(expected);
    },
    1000,
  ),
);

// Expect correct types in table
expectError(
  test.concurrent.each<[['a', string]], 1>`
    a
    ${1}
  `('some test', async () => {}, 1000),
);

// Expect correct number of values in table
expectError(
  test.concurrent.each<[['a', number]], 2>`
    a
    ${1}
  `('some test', async () => {}, 1000),
);

// Expect corret types in callback function
expectType<void>(
  describe.each<[['a', string], ['b', number], ['expected', boolean]], 2>`
    a      | b    | expected
    ${'1'} | ${1} | ${true}
    ${'1'} | ${2} | ${false}
  `(
    'some test',
    ({a, b, expected}) => {
      expectType<string>(a);
      expectType<number>(b);
      expectType<boolean>(expected);
    },
    1000,
  ),
);

// Expect correct types in table
expectError(
  describe.each<[['a', string]], 1>`
    a
    ${1}
  `('some test', () => {}, 1000),
);

// Expect corret types in callback function
expectError(
  describe.each<[['a', number]], 2>`
    a
    ${1}
  `('some test', () => {}, 1000),
);
