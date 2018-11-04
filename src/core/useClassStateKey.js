/**
 *  https://github.com/salvoravida/react-class-hooks
 */

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
            setValue: (value) => {
                self[MAGIC_STATES][keySymbol].value = value;
                if (self.updater.isMounted(self)) self.forceUpdate();
            },
        };
    }

    const { value, setValue } = self[MAGIC_STATES][keySymbol];
    return [value, setValue];
}
