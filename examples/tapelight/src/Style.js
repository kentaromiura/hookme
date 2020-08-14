import { Component, html, useEffect, useState } from "uland";
import { useMorph, useSelector, stimulate, useMorphOnStimulus } from "../../..";
import { Colors, Collections, themeIds } from "./State";
import { Theme } from "./Stimuli";

const Style = new Component(() => {
  const morphAt = useMorphOnStimulus(Colors);
  morphAt(Theme, (colors, newColors) => {
    themeIds.forEach((id) => {
      colors[id] = newColors[id];
    });
  });
  // App
  const AppBackground = useSelector(Colors, (c) => c.background);
  const AppForeground = useSelector(Colors, (c) => c.f_high);

  // New Collection
  const NewCollectionBackground = useSelector(Colors, (c) => c.b_high);
  const NewCollectionForeground = useSelector(Colors, (c) => c.f_high);
  const NewCollectionPriority = useSelector(Colors, (c) => c.tape_priority);
  const OPEN_HEIGHT = "30px";
  const CLOSED_HEIGHT = "15px";

  // Collections
  const PlaceholderColor = useSelector(Colors, (c) => c.b_low);
  const CollectionsBackground = useSelector(Colors, (c) => c.b_high);
  const CollectionsColor = useSelector(Colors, (c) => c.f_high);
  const CollectionsLowcolor = useSelector(Colors, (c) => c.f_low);

  // Todos
  const TodoPriority = useSelector(Colors, (c) => c.tape_priority);
  const TodoWorking = useSelector(Colors, (c) => c.tape_working);
  const TodoDone = useSelector(Colors, (c) => c.tape_done);

  return html`
    <style>
      ${`
    .App {
        height: 100vh;
        background: ${AppBackground};
        color: ${AppForeground};
    }

    .new-collection-input {
        display: inline-block;
        width: 100%;
        height: 100%;
        border: 0;
        background: transparent;
        color: ${NewCollectionForeground}
    }
    
    .new-collection-input::placeholder {
        color: ${NewCollectionPriority};
        text-align: center;
        font-size: 0.6em;
        font-weight: bold;
    }
    
    .new-collection-input:focus::placeholder {
        color: ${PlaceholderColor};
        text-align: left;
        filter: brightness(185%);
    }
    
    .new-collection {
        height: ${CLOSED_HEIGHT};
        border-radius: 0.3em;
        margin: 0 1em;
        transition: height 0.25s ease-in;
        background: ${NewCollectionBackground};
        color: ${NewCollectionForeground};
    }
    
    .new-collection.is-in-edit {
        height: ${OPEN_HEIGHT};
    }
    
    
    .new-collection.forceOpen,
    .new-collection:hover,
    .new-collection:focus,
    .new-collection:active {
        height: ${OPEN_HEIGHT};
        transition: height 0.25s ease-in;
    }
    
    .collection {
        background-color: transparent;
        color: ${CollectionsColor};
        margin:  1em;
      }
    
      .collection > * {
        background-color: ${NewCollectionBackground};
      }
    
      .collection .todos {
        min-height: 5px;
        margin: 1px 0;  
      }
    
      .collection .title {
        border-radius: 0.3em 0.3em 0 0;
        height: 1.5em;
        text-transform: uppercase;
        line-height: 1.5em;
      }
      
      .collection .footer {
        height: 1.5em;
        line-height:1.5em;
        border-radius: 0 0 0.3em 0.3em;
        color: ${CollectionsLowcolor};
      }
    
      .collection .footer .small {
        margin: 1em;
        opacity: 0.35;
        transition: opacity 0.25s ease-in;
      }
    
      .collection .footer .small:hover {
        opacity: 1;
        transition: opacity 0.25s ease-in;
      }
      
      .small {
        font-size:0.6em;
      }

      .add-button {
        border: 0;  
          width: 100%;
          height: ${CLOSED_HEIGHT};
          transition: height 0.25s ease-in;
          transition: color 0.20s ease-in;
          background: ${NewCollectionBackground};
          color: transparent;
      }
      .add-button::placeholder {
          color: transparent;   
          font-size: 0.6em;
          font-weight: bold;
      }
      .add-button:hover {
        height: ${OPEN_HEIGHT};
        transition: height 0.25s ease-in;
        transition: color 0.20s ease-in;
        color: ${NewCollectionForeground};
      }
      
      .add-button:hover::placeholder {
        transition: color 0.20s ease-in;
        color: ${NewCollectionPriority};
        filter: brightness(185%);
        text-align: center;
      }
      .add-button:focus::placeholder {
        transition: color 0.01s ease-in;
        color:${PlaceholderColor};
        text-align: left;
      }
      .todos {          
        background: transparent;
        display: flex;
        flex-direction: column;
        justify-items: center;
      }
      .todo {          
        border-radius: 3px;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
        margin-bottom: 1px;
        background: ${NewCollectionBackground}; 
        text-transform: uppercase;
        font-size: 0.8em;
        width: 100%;
        position: relative;
      }
      .todo.priority {
          color: ${TodoPriority};
      }
      .todo.working {
        color: ${TodoWorking};
      }
      .todo.done {
        color: ${TodoDone};
      }
      .todo.priority::after {
        content: 'PRIORITY';
        position: absolute;
        right: 1em;
        font-weight: lighter;
        font-size: 0.8em;
      }
      .todo.working::after {
        content: 'WORKING';
        position: absolute;
        right: 1em;
        font-weight: lighter;
        font-size: 0.8em;
      }
      .todo.done::after {
        content: 'DONE';
        position: absolute;
        right: 1em;
        font-weight: lighter;
        font-size: 0.8em;
      }
      .stats {
          display: flex;
          background-color: ${NewCollectionBackground};
          transition: height 0.25s ease-out;
          height: 5px;
          color: transparent;
          font-size: small;
          font-family: monospace;
          text-indent: 1em;
      }
      .stats:hover {
        transition: height 0.25s ease-in;
        transition: color 0.25s ease-in;
        
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        margin-bottom: 1px;
        color: white;
      }

      .stats .working {
          background-color: ${TodoWorking};
      }
      .stats .priority {
          background-color: ${TodoPriority};
      }
      .stats .done {
          background-color: ${TodoDone};
      }
      .stat span {
          margin-right: 3px;
      }
      input[type=text] {
          outline: 0;
          text-indent: 0.3em;
      }
`}
    </style>
  `;
});

export default Style;
