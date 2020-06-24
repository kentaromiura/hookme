import {State} from './state';

import {useSelectors} from '../../..';
import React from 'react';

export default () => {
    const selector = useSelectors([State, State], (s1, s2) => s1.selector * s2.test);
    return <span class="many">many selectors {selector}</span>;
};