import { Component, html } from "uland";
import { Collections as CollectionsState } from "./State";

import { useSelector, useMorph } from "../../..";

const ITEM_STATUSES = ["", "priority", "working", "done"];

const AddButton = Component(({ morphTodoList }) => {
  const Add = (item) => {
    morphTodoList((list) => {
      list.push({
        text: item,
        status: 0,
      });
    });
  };

  return html`<input
    onkeyup=${(e) => {
      const onEnter = e.key === "Enter";
      if (onEnter) {
        if (onEnter) {
          Add(e.target.value);
          e.target.value = "";
          requestAnimationFrame(() => {
            e.target.blur();
          });
        }
      }
    }}
    type="text"
    class="add-button"
    onFocus=${(e) => e.target.setAttribute("placeholder", "NAME")}
    onBlur=${(e) => e.target.setAttribute("placeholder", "ADD")}
    placeholder="ADD"
  />`;
});

const Todo = Component(({ todo, index, morphTodoList }) => {
  const todoStatus = "todo " + ITEM_STATUSES[todo.status];
  return html`<div
    onClick=${(e) => {
      morphTodoList((list) => {
        const item = list[index];
        item.status =
          item.status < ITEM_STATUSES.length - 1 ? item.status + 1 : 0;
      });
    }}
    class=${todoStatus}
  >
    ${todo.text}
  </div>`;
});

const Stat = Component(({ percent, items }) => {
  const dots = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const width = Math.round(items / 2) * 6;
  dots.setAttribute("width", width + "px");
  dots.setAttribute("height", "50%");
  for (let i = 1; i <= items; i++) {
    const cir1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    cir1.setAttribute("cx", -3 + Math.round(i / 2) * 6);
    cir1.setAttribute("cy", i % 2 == 0 ? "30%" : "60%");
    cir1.setAttribute("r", "1.5");
    cir1.setAttribute("fill", "white");
    dots.appendChild(cir1);
  }

  return html`<div class="stat">
    <span>${percent + "%"}</span
    ><span style="vertical-align: middle;">${dots}</span><span>${items}</span>
  </div>`;
});

const StatsBar = Component(({ todoList }) => {
  const total = todoList.length;
  const normal = todoList.filter((todo) => todo.status == 0).length;
  const priority = todoList.filter((todo) => todo.status == 1).length;
  const working = todoList.filter((todo) => todo.status == 2).length;
  const done = todoList.filter((todo) => todo.status == 3).length;
  const children = [];
  let rest = 100;
  if (done) {
    const percent = (done / total) * 100;
    rest -= Math.round(percent);
    children.push(
      html`<div class="done" style=${"width: " + percent + "%;"}>
        ${Stat({
          percent: Math.round(percent),
          items: done,
        })}
      </div>`
    );
  }

  if (working) {
    const percent = (working / total) * 100;
    rest -= Math.round(percent);
    children.push(
      html`<div class="working" style=${"width: " + percent + "%;"}>
        ${Stat({
          percent: Math.round(percent),
          items: working,
        })}
      </div>`
    );
  }

  if (priority) {
    const percent = (priority / total) * 100;
    rest -= Math.round(percent);
    children.push(
      html`<div class="priority" style=${"width: " + percent + "%;"}>
        ${Stat({
          percent: Math.round(percent),
          items: priority,
        })}
      </div>`
    );
  }

  if (normal) {
    children.push(
      html`<div class="normal">
        ${Stat({
          percent: rest,
          items: normal,
        })}
      </div>`
    );
  }

  return html`<div class="stats">${children}</div>`;
});

const Collection = Component(({ title, todos }) => {
  const [todoList, morphTodoList] = useMorph(todos);
  return html`
    <div class="collection">
      <section class="title"><center class="small">${title}</center></section>
      <section class="todos">
        ${todoList.length > 0 ? StatsBar({ todoList }) : ""}
        ${todoList.map((todo, index) =>
          Todo({
            todo,
            index,
            morphTodoList,
          })
        )}
        ${AddButton({ morphTodoList })}
      </section>
      <section class="footer">
        <span class="small">${todoList.length} ITEMS</span>
      </section>
    </div>
  `;
});

const Collections = Component(() => {
  const collections = useSelector(CollectionsState, (c) => c);

  return html`
    <div class="collections">
      ${collections.map((collection) => Collection(collection))}
    </div>
  `;
});

export default Collections;
