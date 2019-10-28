/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassMemoKey } from './useClassMemo';
import { createHook, createNamedHook } from './createHook';

export function useClassCallbackKey(keySymbol, callback, inputs) {
    return useClassMemoKey(keySymbol, () => callback, inputs);
}

export const useClassCallback = createHook('Callbacks', useClassCallbackKey);

useClassCallback.create = (name) => createNamedHook(name, useClassCallbackKey);

useClassCallback.createStack = (stackName) => createHook(stackName, useClassCallbackKey);
