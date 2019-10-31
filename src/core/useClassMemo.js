/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import invariant from 'tiny-invariant';
import { checkSymbol, getMagicSelf, MAGIC_MEMOS } from './magicSelf';
import { inputsArrayEqual } from './inputsEqual';
import { createHook, createNamedHook } from './createHook';
import { setDevToolsHookState } from './devTools';

export const useClassMemoKey = (keySymbol, creator, inputs) => {
  checkSymbol('useClassMemo', keySymbol);
  invariant(typeof creator === 'function', 'Creator should be a function!');
  invariant(!inputs || Array.isArray(inputs), 'inputs should be an array!');

  const self = getMagicSelf();

  // create magic Memos if not exists
  if (!self[MAGIC_MEMOS]) self[MAGIC_MEMOS] = {};

  // First Render -> assign creator, inputs, value
  if (!self[MAGIC_MEMOS].hasOwnProperty(keySymbol)) {
    self[MAGIC_MEMOS][keySymbol] = {
      creator,
      inputs,
      value: creator()
    };
  } else {
    // next renders
    let execute = false;
    if (!inputs) {
      if (creator !== self[MAGIC_MEMOS][keySymbol].creator) {
        execute = true;
      }
    } else {
      execute = !inputsArrayEqual(inputs, self[MAGIC_MEMOS][keySymbol].inputs);
    }
    if (execute) {
      self[MAGIC_MEMOS][keySymbol] = {
        creator,
        inputs,
        value: creator()
      };
    }
  }

  const returnValue = self[MAGIC_MEMOS][keySymbol].value;
  setDevToolsHookState(keySymbol.description, returnValue);
  return returnValue;
};

export const useClassMemo = createHook('Memos', useClassMemoKey);

useClassMemo.create = name => createNamedHook(name, useClassMemoKey);

useClassMemo.createStack = stackName => createHook(stackName, useClassMemoKey);
