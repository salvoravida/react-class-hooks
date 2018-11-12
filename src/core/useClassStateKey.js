/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import invariant from 'tiny-invariant';
import { getMagicSelf, checkSymbol, MAGIC_STATES } from './magicSelf';

export function useClassStateKey(keySymbol, initialValue) {
    checkSymbol('useClassStateKey', keySymbol);

    const self = getMagicSelf();

    //first time Render && first Hook
    if (!self[MAGIC_STATES]) self[MAGIC_STATES] = {};

    //first time Render -> assign initial Value and create Setter
    if (!self[MAGIC_STATES].hasOwnProperty(keySymbol)) {
        self[MAGIC_STATES][keySymbol] = {
            value: typeof initialValue === 'function' ? initialValue() : initialValue,
            setValue: (value, callback) => {
                self[MAGIC_STATES][keySymbol].value = typeof value === 'function'
                    ? value(self[MAGIC_STATES][keySymbol].value) : value;
                //check if mounted yet
                invariant(!callback || typeof callback === 'function', 'setState callback must be a function!');
                if (self.updater.isMounted(self)) self.forceUpdate(callback);
            },
        };
    }

    const { value, setValue } = self[MAGIC_STATES][keySymbol];
    return [value, setValue];
}
