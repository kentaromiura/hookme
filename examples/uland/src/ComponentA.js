import {State} from './state';

import {useMorph, useSelector} from '../../..';
import {Component, html} from 'uland';

export default Component(() => {
    const [state, morph] = useMorph(State);
    const selector = useSelector(State, (s) => s.selector);

return (
    html`<div class="component-a">
        <span>
            Shared counter no 1: ${state.test}<br /> 
            with a selector counter: ${selector}<br />
            <hr />
            <a onClick=${() => {
                morph(s => {s.selector++})
            }}>Add for selector</a>
        </span>
        <br />
        <a onClick=${() => {
            morph(s => {
                s.test++
            });
        }}>
            Add to shared from component 1
        </a>
    </div>`
);
});