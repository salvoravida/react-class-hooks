/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassStateKey } from './useClassStateKey';
import { createNamedHook, createHook } from './createHook';

export const useClassReducerKey = (keySymbol, reducer, initialState) => {
    const [state, setState] = useClassStateKey(keySymbol, initialState);

    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
};

export const useClassReducer = createHook('Reducers', useClassReducerKey);

useClassReducer.create = name => createNamedHook(name, useClassReducerKey);
