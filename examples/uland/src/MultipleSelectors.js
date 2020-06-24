import {State} from './state';

import {useSelectors} from '../../..';
import {Component, html} from 'uland';

export default Component(() => {
    const selector = useSelectors([State, State], (s1, s2) => s1.selector * s2.test);
    return html`<span class="many">many selectors ${selector}</span>`
});