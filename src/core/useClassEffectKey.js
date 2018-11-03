/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import invariant from 'tiny-invariant';
import { checkSymbol, getMagicSelf, MAGIC_EFFECTS } from './magicSelf';

export const useClassEffectKey = (keySymbol, creator, inputs, onlyDidUpdate = false) => {
    checkSymbol('useClassEffect', keySymbol);
    invariant(typeof creator === 'function', 'Creator should be a function!');
    invariant(!inputs || Array.isArray(inputs), 'inputs should be an array!');

    const self = getMagicSelf();

    //create MAGIC_EFFECTS if not exists
    if (!self[MAGIC_EFFECTS]) self[MAGIC_EFFECTS] = {};

    //First Render -> Assign creator, inputs and inject methods
    //TODO didCatch
    if (!self[MAGIC_EFFECTS].hasOwnProperty(keySymbol)) {
        self[MAGIC_EFFECTS][keySymbol] = {
            creator,
            inputs,
        };

        if (!onlyDidUpdate) {
            //inject componentDidMount
            const didMount = typeof self.componentDidMount === 'function' ? self.componentDidMount.bind(self) : undefined;
            self.componentDidMount = () => {
                didMount && didMount();
                self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator();
            };
        }

        //inject componentDidUpdate
        const didUpdate = typeof self.componentDidUpdate === 'function' ? self.componentDidUpdate.bind(self) : undefined;
        self.componentDidUpdate = (...args) => {
            didUpdate && didUpdate(...args);
            //execute if no inputs!
            let execute = !self[MAGIC_EFFECTS][keySymbol].inputs;
            //check if input array has values and values changed
            if (!execute) {
                self[MAGIC_EFFECTS][keySymbol].inputs.forEach((input, index) => {
                    execute = execute || self[MAGIC_EFFECTS][keySymbol].prevInputs[index] !== input;
                });
            }
            if (execute) {
                self[MAGIC_EFFECTS][keySymbol].cleaner && self[MAGIC_EFFECTS][keySymbol].cleaner();
                self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator();
            }
        };

        //inject componentWillUnmount
        const unmount = typeof self.componentWillUnmount === 'function' ? self.componentWillUnmount.bind(self) : undefined;
        self.componentWillUnmount = () => {
            unmount && unmount();
            self[MAGIC_EFFECTS][keySymbol].cleaner && self[MAGIC_EFFECTS][keySymbol].cleaner();
        };
    } else {
        //next renders
        self[MAGIC_EFFECTS][keySymbol] = {
            prevInputs: self[MAGIC_EFFECTS][keySymbol].inputs,
            cleaner: self[MAGIC_EFFECTS][keySymbol].cleaner,
            creator,
            inputs,
        };
    }
};

export function useClassEffectExist(keySymbol) {
    const self = getMagicSelf();
    return !!self[MAGIC_EFFECTS] && !!self[MAGIC_EFFECTS].hasOwnProperty(keySymbol);
}
