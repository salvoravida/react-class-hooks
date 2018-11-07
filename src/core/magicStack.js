/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassRefKey } from './useClassRef';
import { useClassEffectKey, useClassEffectExist } from './useClassEffectKey';

export function MagicStack(StackName) {
    this.name = StackName;
    this.symbol = Symbol(`${this.name}.Stack`);
    this.cleanSymbol = Symbol(`${this.name}.Stack.Cleaner`);
    this.keys = [];

    this.getKey = (stackIndex) => {
        const len = this.keys.length;
        //create if not exist
        if (stackIndex > len) {
            for (let i = len; i < stackIndex; i += 1) this.keys.push(Symbol(`${this.name}-${i}`));
        }
        return this.keys[stackIndex - 1];
    };
}

export function useMagicStack(magicStack, hook, [...args]) {
    const stack = useClassRefKey(magicStack.symbol, 0);

    //optimization after first call in the same rendering phase
    if (!useClassEffectExist(magicStack.cleanSymbol)) {
        //clean stack after render
        useClassEffectKey(magicStack.cleanSymbol, () => {
            stack.current = 0;
        });
    }

    //update stack counter
    stack.current += 1;

    return hook(magicStack.getKey(stack.current), ...args);
}
