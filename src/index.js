/**
 *  https://github.com/salvoravida/react-class-hooks
 */

import { useClassState } from './core/useClassState';
import { useClassEffect } from './core/useClassEffect';
import { useClassMemo } from './core/useClassMemo';
import { useClassCallback } from './core/useClassCallback';
import { useClassReducer } from './core/useClassReducer';
import { useClassRef, refCallback } from './core/useClassRef';
import { useClassContext } from './core/useClassContext';
import { useClassImperativeHandle } from './core/useClassImperativeHandle';

const useClassLayoutEffect = useClassEffect;

export {
  useClassState,
  useClassEffect,
  useClassLayoutEffect,
  useClassMemo,
  useClassCallback,
  useClassReducer,
  useClassRef,
  refCallback,
  useClassContext,
  useClassImperativeHandle
};
