/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import invariant from 'tiny-invariant';
import { checkSymbol, getMagicDispatcher, getMagicSelf } from './magicSelf';
import { setDevToolsHookState } from './devTools';
import { createHook } from './createHook';

export function useClassContextKey(keySymbol, context, observedBits) {
  checkSymbol('useClassContext', keySymbol);
  getMagicSelf(); // invariant hook outside render method
  invariant(context && context.Provider && context.Consumer, 'Context should be React.createContext object!');

  const contextValue = getMagicDispatcher().readContext(context, observedBits);

  setDevToolsHookState(keySymbol.description, contextValue);

  return contextValue;
}

export const useClassContext = createHook('Contexts', useClassContextKey);
