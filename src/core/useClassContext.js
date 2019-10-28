/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import invariant from 'tiny-invariant';
import { createNamedHook, createHook } from './createHook';
import { checkSymbol, getMagicDispatcher } from './magicSelf';

export const useClassContextKey = (keySymbol, Context) => {
    checkSymbol('useClassContext', keySymbol);
    invariant(Context && Context.Provider && Context.Consumer, 'Context should be React.createContext object!');

    return getMagicDispatcher().readContext(Context);
};

export const useClassContext = createHook('Contexts', useClassContextKey);

useClassContext.create = (name) => createNamedHook(name, useClassContextKey);
