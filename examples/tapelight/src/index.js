import { useHooksFrom, stimulate } from "../../..";
import * as uland from "uland";
import { Theme } from "./Stimuli";
import { themeIds } from "./State";

function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const dt = event.dataTransfer;
  console.log(dt);
  //console.log(dt.getData('Text'));

  //const img = new Image();
  //img.crossOrigin = true;
  fetch("https://cors-anywhere.herokuapp.com/" + dt.getData("URL")).then(
    (x) => {
      x.text().then((text) => {
        const svg = document.createElement("div");
        svg.innerHTML = text;
        const newStyle = {};
        themeIds.forEach((id) => {
          const el = svg.querySelector("#" + id);
          if (el) {
            const value = el.getAttribute("fill");
            if (value) {
              newStyle[id] = value;
            }
          }
        });
        stimulate(Theme, newStyle);
      });
    }
  );
  //console.log(dt.files)
}

import App from "./App";
useHooksFrom(uland);
onload = () => {
  uland.render(document.body, App());
  console.log("start");
  document.body.addEventListener("drop", handleDrop, false);

  document.body.addEventListener("dragover", (e) => e.preventDefault(), false);
  //document.body.addEventListener('drop', handleDrop, false);
};
