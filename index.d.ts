import type {Global} from '@jest/types'

// Create Tuple with N times type T
type _Tuple<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _Tuple<T, N, [T, ...R]>

type Tuple<T, N extends number> = _Tuple<T, N, []>

// Flatten 2d tuple to 1d tuple
type Flat<S extends unknown[][]> = S['length'] extends 0
  ? []
  : S extends [infer T, ...infer U]
    ? T extends unknown[]
      ? U extends unknown[][]
        ? [...T, ...Flat<U>]
        : never
      : never
    : never


// Create Tuple by concatenating tuple T N times
type TupleNTimes<T extends unknown[], N extends number> = Flat<Tuple<T, N>>

// Create interface from KeyValueTuple
type KeyValueTupleToInterface<T extends [string, unknown][]> = {
  readonly [key in T[number][0]]: Extract<T[number], [key, unknown]>[1]
}

// Get Values from KeyValueTuple
type KeyValueTupleToValues<S extends [string, unknown][]> = {
  [i in keyof S]: S[i] extends [string, unknown] ? S[i][1] : never
}

type NewEach<EachFn extends Global.TestFn | Global.BlockFn> = {
  <T extends [string, unknown][], N extends number>(strings: TemplateStringsArray, ...placeholders: TupleNTimes<KeyValueTupleToValues<T>, N>): (
    name: string,
    fn: (arg: KeyValueTupleToInterface<T>) => ReturnType<EachFn>,
    timeout?: number
  ) => void;
}

type EachConcurrentTestFn = Global.ItConcurrentBase['each'] & NewEach<Global.ConcurrentTestFn>
type EachTestFn = Global.ItBase['each'] & NewEach<Global.TestFn>
type EachBlockFn = Global.DescribeBase['each'] & NewEach<Global.BlockFn>

interface Failing<EachFn> {
  each: EachFn;
}

interface ItBase {
  each: EachTestFn;
  failing: Failing<EachTestFn>;
}

interface It extends ItBase {
  only: ItBase;
  skip: ItBase;
}

interface ItConcurrentBase {
  each: EachConcurrentTestFn;
  failing: Failing<EachConcurrentTestFn>
}

interface ItConcurrentExtended extends ItConcurrentBase {
  only: ItConcurrentBase;
  skip: ItConcurrentBase;
}

interface ItConcurrent extends It {
  concurrent: ItConcurrentExtended
}

interface DescribeBase {
  each: EachBlockFn
}

interface Describe extends DescribeBase {
  only: DescribeBase;
  skip: DescribeBase;
}


export * from '@jest/globals';
export declare const it: ItConcurrent & Global.ItConcurrent;
export declare const test: ItConcurrent & Global.ItConcurrent;
export declare const describe: Describe & Global.Describe;
