import { useHooksFrom } from "../../..";
import * as uland from "uland";

import App from "./App";
useHooksFrom(uland);
onload = () => {
  uland.render(document.body, App());
};
