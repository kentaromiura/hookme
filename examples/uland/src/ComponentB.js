import {State} from './state';

import {useMorph} from '../../..';
import {Component, html} from 'uland';


export default Component(() => {
    const [state, morph] = useMorph(State);
    return (
        html`<div class="component-b">
            Shared counter from component B: ${state.test}
        <br />
        <hr />
        <a onClick=${() => {
            morph(s => {
                s.test++
            });
        }}>
            Add to shared from component 2
        </a>
        </div>`
    );
});