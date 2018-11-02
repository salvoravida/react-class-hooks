/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { createHook, createNamedHook } from './createHook';
import { useClassEffectKey } from './useClassEffectKey';

export const useClassEffect = createHook('Effects', useClassEffectKey);

useClassEffect.create = name => createNamedHook(name, useClassEffectKey);

useClassEffect.createStack = stackName => createHook(stackName, useClassEffectKey);

/*********************************************  alias -  may confuse ?  ***********************************************/

export function useClassDidMount(...args) {
    if (args && args.length > 1 && typeof args[0] === 'symbol') return useClassEffect(args[0], args[1], []);
    return useClassEffect(args[0], []);
}

export function useClassDidUpdate(...args) {
    if (args && args.length > 2 && typeof args[0] === 'symbol') return useClassEffect(args[0], args[1], args[2], true);
    return useClassEffect(args[0], args[1], true);
}
