import React from 'react';

import A from './ComponentA';
import B from './ComponentB';
import S from './SingleSelector';
import MS from './MultipleSelectors';

const App = Component(() => {
  return (
    <div className="App">
        <A />
        <B />
        <br />
        <S />
        <MS />
    </div>
  );
});

export default App;