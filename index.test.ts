import { textChangeRangeIsUnchanged } from "typescript";

type Variables = [
  ['var1', string],
  ['var2', number],
  ['var3', boolean],
  ['var4', null],
  ['var5', undefined],
  ['var6', {}],
  ['var7', number[]]
]

const var1 = '';
const var2 = 42;
const var3 = true;
const var4 = null;
const var5 = undefined;
const var6 = {};
const var7 = [1, 2, 3];

describe('test types', () => {
  test.each<Variables, 2>`
  var1    | var2    | var3    | var4    | var5    | var6    | var7
  ${var1} | ${var2} | ${var3} | ${var4} | ${var5} | ${var6} | ${var7}
  ${var1} | ${var2} | ${var3} | ${var4} | ${var5} | ${var6} | ${var7}
  `('new typings: vars should have correct types', ({var1, var2, var3, var4, var5, var6, var7}) => {
    const exp1: string = var1;
    const exp2: number = var2;
    const exp3: boolean = var3;
    const exp4: null = var4;
    const exp5: undefined = var5;
    const exp6: {} = var6;
    const exp7: number[] = var7
  });

  test.each`
  var1
  ${'36'}
  `('old typings: var1 should be any', ({var1}) => {
    const exp1: string = var1;
    const exp2: number = var1;
    const exp3: boolean = var1;
    const exp4: null = var1;
    const exp5: undefined = var1;
    const exp6: {} = var1;
    const exp7: number[] = var1;
  });
});

export default {};
