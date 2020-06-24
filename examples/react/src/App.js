import React from "react";

import A from "./ComponentA";
import B from "./ComponentB";
import S from "./SingleSelector";
import MS from "./MultipleSelectors";
import TS from "./TestStimuli";

const App = () => {
  return (
    <div className="App">
      <A />
      <B />
      <br />
      <S />
      <MS />
      <TS />
    </div>
  );
};

export default App;
