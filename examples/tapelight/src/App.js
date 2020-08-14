import { Component, html, useEffect } from "uland";
import { GlobalEnter } from "./Stimuli";

import { stimulate } from "../../..";
import Style from "./Style";
import NewCollection from "./NewCollection";
import Collections from "./Collections";

const App = Component(() => {
  useEffect(() => {
    document.documentElement.onkeyup = (e) => {
      if (e.key === "Enter") {
        stimulate(GlobalEnter);
      }
    };
  }, []);

  return html` ${Style()}
    <div class="App">
      ${NewCollection()} ${Collections()}
      <center>Press enter to add a collection.</center>
      <center>
        <i
          >This demo is inspired by
          <a href="https://aeriform.itch.io/tape">tape</a>, if you like it
          please <a href="<a href="https://aeriform.itch.io/tape"
            >consider buying the original instead</a
          ></i
        >
      </center>
    </div>`;
});

export default App;
