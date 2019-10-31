/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { createHook } from './createHook';
import { checkSymbol } from './magicSelf';
import { setDevToolsHookState } from './devTools';

export function useClassDebugValueKey(keySymbol, value, formatter) {
  checkSymbol('useDebugValueKey', keySymbol);
  const viewValue= typeof formatter==="function"? formatter(value) : value;
  setDevToolsHookState(keySymbol.description,viewValue)
}

export const useClassDebugValue = createHook('DebugValue', useClassDebugValueKey);

