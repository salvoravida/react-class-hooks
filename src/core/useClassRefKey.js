/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { checkSymbol, getMagicSelf, MAGIC_REFS } from './magicSelf';

export function useClassRefKey(keySymbol, initialValue) {
  checkSymbol('useClassRefKey', keySymbol);

  const self = getMagicSelf();

  // first time Render && first Hook
  if (!self[MAGIC_REFS]) self[MAGIC_REFS] = {};

  // first time Render -> assign initial Value
  if (!self[MAGIC_REFS].hasOwnProperty(keySymbol)) {
    const ref = { current: initialValue };
    Object.seal(ref);
    self[MAGIC_REFS][keySymbol] = ref;
  }

  return self[MAGIC_REFS][keySymbol];
}
