/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassMemoKey } from './useClassMemo';
import { createHook } from './createHook';

export function useClassCallbackKey(keySymbol, callback, inputs) {
    return useClassMemoKey(keySymbol, () => callback, inputs);
}

export const useClassCallback = createHook('Callbacks', useClassCallbackKey);
