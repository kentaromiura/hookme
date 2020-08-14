_HookMe_
===

_HookMe_ is a simple state management think for quickly prototype apps,
It rely on hooks implementation, making it usable not just in react but any framework that implements the `useState` and `useEffect` hooks.
To show this I created an example in both React and Uland.

_HookMe_ uses Immer under the hood to make all changes to the state immutable.

_HookMe_ is though to be easy to minify, it doesn't rely on strings aparts for the shared functionality though for bundle splitting scenarios.

*Disclaimer: I need to re-write the entire documentation, so for now please refer to the examples in the meantime.*

How does it work?
===

The main core of hook-me are the `useMorph` and `useSelector` hooks.
Both take a reference to the initial state, that reference will be used by `useMorph` under the hood to change the state and propagate it to the selectors.

```const  [state, morph] = useMorph(state)```
```const state = useSelector(state, selectFn, equality = (a, b) => a === b)```

`useMorph` returns a `morph` function that is the callback you'll use in https://immerjs.github.io/immer/docs/produce second parameter, it gives you a _draft_ object that you can freely modify.


`useMorph` is used when you want to mutate the state, while `useSelector` is used to listen to state mutation and re-triggering rendering.

_HookMe_ provides also a `useSelectors` when you need to listen to changes from multiple states.


Stimuli
===

_HookMe_ provides an easy to use event-system (similar to dispatch) called stimuli, it works in a similar way of the morph and select but allows, for example, global events to be handled in multiple parts.
`stimulate` is used to stimulate changes in your application, it accepts a stimulus and the stimulus detail.

For when you want to use stimuli to mutate the state you'll use the `useMorphOnStimulus`, otherwise `useStimulus` can be used.

Bundle split
===
Given that HookMe use references to the initial state to keep track of changes it would be difficult to use bundle split as each bundle would refer to a different instance of the object.

For this reason HookMe provides a `useShared(id, initialValue)` to ensure the reference will be the same, this part is still experimental and it's the only place where a string is required.
