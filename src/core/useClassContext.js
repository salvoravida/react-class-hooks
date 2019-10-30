/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import invariant from 'tiny-invariant';
import { getMagicDispatcher, getMagicSelf } from './magicSelf';

export const useClassContext = (context, observedBits) => {
  getMagicSelf(); // invariant hook outside render method
  invariant(
    context && context.Provider && context.Consumer,
    'Context should be React.createContext object!'
  );
  return getMagicDispatcher().readContext(context, observedBits);
};
