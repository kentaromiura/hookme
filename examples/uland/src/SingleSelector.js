import {State} from './state';

import {useSelector} from '../../..';
import {Component, html} from 'uland';

export default Component(() => {
    const selector = useSelector(State, (s) => s.selector);

return html`<span class="selector">just selector ${selector}</span>`
});