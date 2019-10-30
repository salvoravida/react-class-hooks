/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { createHook, createNamedHook } from './createHook';
import { useClassRefKey } from './useClassRefKey';

export const useClassRef = createHook('Refs', useClassRefKey);

useClassRef.create = name => createNamedHook(name, useClassRefKey);

useClassRef.createStack = stackName => createHook(stackName, useClassRefKey);

// poly 15 ref
export const refCallback = refObject => ref => {
  refObject.current = ref;
};
