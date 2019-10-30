import invariant from 'tiny-invariant';

export function inputsArrayEqual(inputs, prevInputs) {
  invariant(inputs.length === prevInputs.length, 'Hooks inputs array length should be constant between renders!');

  // Object.is polyfill
  for (let i = 0; i < inputs.length; i += 1) {
    const val1 = inputs[i];
    const val2 = prevInputs[i];

    if (!((val1 === val2 && (val1 !== 0 || 1 / val1 === 1 / val2)) || (val1 !== val1 && val2 !== val2))) {
      // eslint-disable-line
      return false;
    }
  }
  return true;
}
