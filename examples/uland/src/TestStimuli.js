import { test } from "./stimuli";
import { StimuliState } from "./state";

import { useMorphOnStimulus, useSelector, stimulate } from "../../..";
import { Component, html, useEffect } from "uland";

export default Component(() => {
  const value = useSelector(StimuliState, (s) => s.test);

  const morphAt = useMorphOnStimulus(StimuliState);
  useEffect(() => {
    morphAt(test, (state, context) => {
      state.test = context;
    });
  }, []);
  return html`<div class="component-b">
    value for stimuli is: ${value}
    <br />
    <hr />
    <a
      onClick=${() => {
        stimulate(test, "Tworks");
      }}
    >
      stimulate
    </a>
  </div>`;
});
