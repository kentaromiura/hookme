import React, { useEffect } from "react";
import { test } from "./stimuli";
import { StimuliState } from "./state";

import { useMorphOnStimulus, useSelector, stimulate } from "../../..";

export default () => {
  const value = useSelector(StimuliState, (s) => s.test);
  const morphAt = useMorphOnStimulus(StimuliState);
  useEffect(() => {
    morphAt(test, (state, context) => {
      state.test = context;
    });
  }, []);
  return (
    <div className="component-b">
      value for stimuli is: {value}
      <br />
      <hr />
      <a
        onClick={() => {
          stimulate(test, "Tworks");
        }}
      >
        stimulate
      </a>
    </div>
  );
};
