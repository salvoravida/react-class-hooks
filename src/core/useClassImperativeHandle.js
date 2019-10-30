import invariant from 'tiny-invariant';
import { useClassEffect } from './useClassEffect';

export function useClassImperativeHandle(ref, create, deps) {
  invariant(
    typeof create === 'function',
    `Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: ${
      create !== null ? typeof create : 'null'
    }`
  );
  invariant(
    deps === null || deps === undefined || Array.isArray(deps),
    'Hook received a final argument that is not an array!'
  );

  const effectDeps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;

  // eslint-disable-next-line consistent-return
  useClassEffect(() => {
    if (typeof ref === 'function') {
      const refCallback = ref;
      refCallback(create());
      // eslint-disable-next-line func-names
      return function() {
        refCallback(null);
      };
    }
    if (ref !== null && ref !== undefined) {
      const refObject = ref;
      invariant(
        refObject.hasOwnProperty('current'),
        `Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: an object with keys {${Object.keys(
          refObject
        ).join(', ')}}`
      );
      refObject.current = create();
      // eslint-disable-next-line func-names
      return function() {
        refObject.current = null;
      };
    }
  }, effectDeps);
}
