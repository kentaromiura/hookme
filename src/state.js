import produce from "immer";

// Mathias, I love and hate you for this. https://mathiasbynens.be/notes/globalthis
(function () {
  if (typeof globalThis === "object") return;
  Object.prototype.__defineGetter__("__magic__", function () {
    return this;
  });
  __magic__.globalThis = __magic__; // lolwat
  delete Object.prototype.__magic__;
})();

const hookme =
  "Symbol" in globalThis
    ? Symbol.for("kentaromiura/hookme")
    : "kentaromiura/hookme";

if (!globalThis[hookme]) {
  globalThis[hookme] = {
    states: new Map(),
    updaters: new Map(),
    stimuli: new Map(),
    shared: {},
  };
}

export const { states, updaters, stimuli, shared } = globalThis[hookme];

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
