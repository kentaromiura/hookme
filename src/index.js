import produce from "immer";
//import { useState, useEffect } from "react";
import { states, updaters, getState, getAllUpdates } from "./state";

let useState = () => {};
let useEffect = () => {};

export function useHooksFrom(lib) {
  useState = lib.useState;
  useEffect = lib.useEffect;
}

export function useSelectors(
  manyState,
  selectFn,
  equality = (a, b) => a === b
) {
  const fromState = getState(manyState);
  const [currentState, updater] = useState(
    selectFn(...fromState.map(getState))
  );
  useEffect(() => {
    const dedupedStates = [...new Set(fromState)];
    for (let i = 0, max = dedupedStates.length; i < max; i++) {
      const state = dedupedStates[i];
      const allUpdates = getAllUpdates(state);

      allUpdates.push((newState) => {
        const newStates = [...fromState].map((each) => {
          if (each === state) {
            return newState;
          }
          return each;
        });

        const newValue = selectFn(...newStates);
        if (!equality(newValue, currentState)) {
          updater(newValue);
        }
      });
    }
  }, []);

  return currentState;
}

export function useSelector(state, selectFn, equality = (a, b) => a === b) {
  const [currentState, updater] = useState(selectFn(state));

  const allUpdates = getAllUpdates(state);
  useEffect(() => {
    allUpdates.push((newState) => {
      const newValue = selectFn(newState);
      if (!equality(newValue, currentState)) {
        updater(newValue);
      }
    });
  }, []);

  return selectFn(getState(state));
}

export function useMorph(state) {
  const [_, updater] = useState(state);
  const allUpdates = getAllUpdates(state);
  useEffect(() => {
    allUpdates.push(updater);
  }, []);
  const update = (s) =>
    updaters.get(state).forEach((update) => {
      update(s);
    });

  return [
    getState(state),
    (f) => {
      const newState = produce(states.get(state), f);
      states.set(state, newState);
      update(newState);
      return states.get(state);
    },
  ];
}
