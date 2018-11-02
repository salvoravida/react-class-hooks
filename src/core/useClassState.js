/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { createHook, createNamedHook } from './createHook';
import { useClassStateKey } from './useClassStateKey';

export const useClassState = createHook('States', useClassStateKey);

useClassState.create = name => createNamedHook(name, useClassStateKey);

useClassState.createStack = stackName => createHook(stackName, useClassStateKey);
