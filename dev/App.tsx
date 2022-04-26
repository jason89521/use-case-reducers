import React, { useState } from 'react';

import useCaseReducer from '../src';

function App() {
  const [count, dispatch] = useCaseReducer(0, {
    increment: state => state + 1,
    add: (state, payload: number) => state + payload,
  });

  return (
    <div>
      <div>{count}</div>

      <button onClick={() => dispatch.increment()}>increment</button>
      <button onClick={() => dispatch.add(10)}>add 10</button>
    </div>
  );
}

export default App;
