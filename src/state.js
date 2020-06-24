import produce from "immer";

export const states = new Map();
export const updaters = new Map();
export const stimuli = new Map();

export const getAllStimuli = (stimulus) => {
  return stimuli.has(stimulus)
    ? stimuli.get(stimulus)
    : stimuli.set(stimulus, []) && stimuli.get(stimulus);
};

export const getState = (initialValue) => {
  return states.has(initialValue)
    ? states.get(initialValue)
    : states.set(
        initialValue,
        produce(initialValue, (state) => state)
      ) && states.get(initialValue);
};

export const getAllUpdates = (state) => {
  return updaters.has(state)
    ? updaters.get(state)
    : updaters.set(state, []) && updaters.get(state);
};
