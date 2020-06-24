import { State } from "./state";

import { useSelector } from "../../..";
import React from "react";

export default () => {
  const selector = useSelector(State, (s) => s.selector);

  return <span className="selector">just selector{selector}</span>;
};
