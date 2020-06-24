import {useHooksFrom} from '../../..';
import * as React from 'react';
import {render} from 'react-dom';
import App from './App';

useHooksFrom(React);

onload = () => {
    render(<App />, document.body)
}