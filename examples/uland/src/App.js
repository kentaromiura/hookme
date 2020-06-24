import { Component, html } from "uland";

import A from "./ComponentA";
import B from "./ComponentB";
import S from "./SingleSelector";
import MS from "./MultipleSelectors";
import TS from "./TestStimuli";

const App = Component(() => {
  return html`<div class="App">
    ${A()} ${B()}
    <br />
    ${S()} ${MS()} ${TS()}
  </div>`;
});

export default App;
