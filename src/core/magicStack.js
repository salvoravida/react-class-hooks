/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassStateKey } from './useClassStateKey';
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
    //no setter - just clean stack not re-render!!
    const [stack] = useClassStateKey(magicStack.symbol, {
        counter: 0,
    });

    //optimization after first call in the same rendering phase
    if (!useClassEffectExist(magicStack.cleanSymbol)) {
        //clean stack after render
        useClassEffectKey(magicStack.cleanSymbol, () => {
            stack.counter = 0;
        });
    }

    //update stack counter
    stack.counter += 1;

    return hook(magicStack.getKey(stack.counter), ...args);
}
