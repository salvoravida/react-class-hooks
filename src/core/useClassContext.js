/**
 *  https://github.com/salvoravida/react-class-hooks
 */
import invariant from 'tiny-invariant';
import { createNamedHook, createHook } from './createHook';
import { checkSymbol, getMagicFiber } from './magicSelf';

export const useClassContextKey = (keySymbol, Context) => {
    checkSymbol('useClassContext', keySymbol);
    invariant(Context && Context.Provider && Context.Consumer, 'Context should be React.createContext object!');

    const contextValue = Context._currentValue; //TODO check _currentValue2 ?!

    const currentFiber = getMagicFiber();

    const contextItem = {
        context: Context,
        observedBits: 1073741823, //all  //TODO support observedBits
        next: null,
    };

    //set contextDependencies for update on Context change.
    if (!currentFiber.contextDependencies) {
        currentFiber.contextDependencies = {
            expirationTime: 0,
            first: contextItem,
        };
    } else {
        let last = currentFiber.contextDependencies.first;
        while (last.next) last = last.next;
        last.next = contextItem;
    }

    return contextValue;
};

export const useClassContext = createHook('Contexts', useClassContextKey);

useClassContext.create = name => createNamedHook(name, useClassContextKey);
