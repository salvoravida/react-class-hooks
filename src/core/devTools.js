import { getMagicSelf } from './magicSelf';

export const devToolConfig = {
  active: false,
  stateKey: '__UNIVERSAL_HOOKS__',
  show: 'object' // object, array, map
};

export function supportReactDevTools({ active, stateKey, show }) {
  if (stateKey) devToolConfig.stateKey = stateKey;
  if (show) devToolConfig.show = show;
  devToolConfig.active = !!active;
}

export function setDevToolsHookState(name, state) {
  if (devToolConfig.active) {
    const self = getMagicSelf();
    const { stateKey, show } = devToolConfig;
    if (!self.state) self.state = {};
    if (!self.state[stateKey]) self.state[stateKey] = show === 'map' ? new Map() : show === 'array' ? [] : {};

    if (show === 'map') {
      self.state[stateKey].set(name, state);
    } else if (show === 'array') {
      const hookState = self.state[stateKey].find(h => h.hasOwnProperty(name));
      if (hookState) {
        hookState[name] = state;
      } else {
        self.state[stateKey].push({ [name]: state });
      }
    } else {
      const hookNames = Object.keys(self.state[stateKey]);
      const hookName = hookNames.find(s => s.split(':')[1] === name);
      self.state[stateKey][hookName || `${hookNames.length.toString().padStart(2, '0')}:${name}`] = state;
    }
  }
}
