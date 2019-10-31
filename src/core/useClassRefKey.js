/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { checkSymbol, getMagicSelf, MAGIC_REFS } from './magicSelf';
import { setDevToolsHookState } from './devTools';

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

  const returnValue = self[MAGIC_REFS][keySymbol];
  setDevToolsHookState(keySymbol.description, returnValue);
  return returnValue;
}
