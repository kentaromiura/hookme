import { Component, html, useEffect, useRef } from "uland";
import { NewCollectionState, Colors, Collections } from "./State";
import { GlobalEnter } from "./Stimuli";

import { useMorph, useMorphOnStimulus } from "../../..";

const OPEN_HEIGHT = "30px";

const NewCollection = Component(() => {
  const [state, morph] = useMorph(NewCollectionState);
  const [_, morphCollections] = useMorph(Collections);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const morphAt = useMorphOnStimulus(NewCollectionState);
  morphAt(GlobalEnter, (s) => {
    if (containerRef.current) {
      if (containerRef.current.height !== OPEN_HEIGHT) {
        containerRef.current.classList.add("forceOpen");
        setTimeout(() => {
          containerRef.current.classList.remove("forceOpen");
        }, 300);
      }
    }
  });

  const exitEditMode = () =>
    morph((s) => {
      s.isInEdit = false;
    });

  const createNewCollection = (collectionName) => {
    morphCollections((c) => {
      c.push({
        title: collectionName,
        todos: [],
      });
    });
  };

  const children = state.isInEdit
    ? [
        html`<input
          ref=${inputRef}
          onkeyup=${(e) => {
            const onEnter = e.key === "Enter";
            const onEsc = e.key === "Escape";
            if (onEnter || onEsc) {
              if (onEnter) {
                createNewCollection(e.target.value);
                e.target.value = "";
              } else exitEditMode();
            }
          }}
          onmouseout=${(e) => {
            if (e.srcElement.value == "") exitEditMode();
          }}
          type="text"
          class="new-collection-input"
          onFocus=${(e) => e.target.setAttribute("placeholder", "NAME")}
          onBlur=${(e) =>
            e.target.setAttribute("placeholder", "NEW COLLECTION")}
          placeholder="NEW COLLECTION"
        />`,
      ]
    : [];

  const className = "new-collection " + (state.isInEdit ? "is-in-edit" : "");
  return html` <div
    ref=${containerRef}
    ontransitionend=${(e) => {
      const isForced = e.target.classList.contains("forceOpen");
      const height = getComputedStyle(e.target).height;

      morph((s) => {
        s.isInEdit = height === OPEN_HEIGHT;
      });

      if (isForced) {
        e.target.classList.remove("forceOpen");
        inputRef.current && inputRef.current.focus();
      }
    }}
    class="${className}"
  >
    ${children}
  </div>`;
});

export default NewCollection;
