import { State } from "./state";

import { useMorph } from "../../..";
import React from "react";

export default () => {
  const [state, morph] = useMorph(State);
  return (
    <div className="component-b">
      Shared counter from component B: {state.test}
      <br />
      <hr />
      <a
        onClick={() => {
          morph((s) => {
            s.test++;
          });
        }}
      >
        Add to shared from component 2
      </a>
    </div>
  );
};
