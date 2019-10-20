/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { MagicStack, useMagicStack } from './magicStack';

export function createHook(stackName, hook) {
    const stack = new MagicStack(stackName);
    return (...args) => {
        if (args && args.length && typeof args[0] === 'symbol') return hook(...args);
        return useMagicStack(stack, hook, ...args);
    };
}

export function createNamedHook(name, hook) {
    const keySymbol = Symbol(name);
    return hook.bind(null, keySymbol);
}
