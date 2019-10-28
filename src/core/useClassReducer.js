/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassStateKey } from './useClassStateKey';
import { createNamedHook, createHook } from './createHook';

export const useClassReducerKey = (keySymbol, reducer, initialState) => {
    const stateSetState = useClassStateKey(keySymbol, initialState);
    const state = stateSetState[0];
    const setState = stateSetState[1];

    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
};

export const useClassReducer = createHook('Reducers', useClassReducerKey);

useClassReducer.create = (name) => createNamedHook(name, useClassReducerKey);
