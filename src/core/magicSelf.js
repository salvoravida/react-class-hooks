/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import React from 'react';
import invariant from 'tiny-invariant';

// inject None effects
React.PureComponent.prototype.componentDidMount = () => {};
React.Component.prototype.componentDidMount = () => {};

//TODO - polyfill
invariant(typeof Symbol === 'function' && Symbol.for, 'react-class-hooks needs Symbols!');

// Separate objects for better debugging.
export const MAGIC_STATES = Symbol.for('magicStates');
export const MAGIC_EFFECTS = Symbol.for('magicEffects');
export const MAGIC_MEMOS = Symbol.for('magicMemos');

export function getMagicSelf() {
    invariant(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current,
        'You are using Hooks outside of "render" React.Component Method!');

    return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current.stateNode;
}

export function checkSymbol(name, keySymbol) {
    invariant(typeof keySymbol === 'symbol', `${name} - Expected a Symbol for key!`);
}
