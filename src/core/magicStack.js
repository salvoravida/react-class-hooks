/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { getMagicSelf, MAGIC_STACKS } from './magicSelf';

export function MagicStack(StackName) {
  this.name = StackName;
  this.symbol = Symbol(`${this.name}.Stack`);
  // this.cleanSymbol = Symbol(`${this.name}.Stack.Cleaner`);
  this.keys = [];

  this.getKey = stackIndex => {
    const len = this.keys.length;
    // create if not exist
    if (stackIndex > len) {
      for (let i = len; i < stackIndex; i += 1) this.keys.push(Symbol(`${this.name}-${i}`));
    }
    return this.keys[stackIndex - 1];
  };
}

export function useMagicStack(magicStack, hook, ...args) {
  // inject next renders stack counter cleaner
  const self = getMagicSelf();
  if (!self[MAGIC_STACKS]) {
    self[MAGIC_STACKS] = {};
    const renderFunc = self.render.bind(self);
    self.render = (...arggs) => {
      Object.getOwnPropertySymbols(self[MAGIC_STACKS]).forEach(k => {
        self[MAGIC_STACKS][k] = 0;
      });
      return renderFunc(...arggs);
    };
  }

  // stack counter init
  if (!self[MAGIC_STACKS][magicStack.symbol]) {
    self[MAGIC_STACKS][magicStack.symbol] = 0;
  }

  // stack counter update
  self[MAGIC_STACKS][magicStack.symbol] += 1;

  return hook(magicStack.getKey(self[MAGIC_STACKS][magicStack.symbol]), ...args);
}
