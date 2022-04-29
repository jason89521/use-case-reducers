import React, { useEffect, useState } from 'react';

import useCaseReducers, { createCaseReducers } from '../src';

const init = (count: number) => {
  return count;
};

const { caseReducers } = createCaseReducers(0, {
  increment: state => state + 1,
  add: (state, amount: number) => state + amount,
});

function App() {
  const [state, dispatch] = useCaseReducers(caseReducers, 0, init);

  const [rerenderCounts, setRerenderCounts] = useState({ state: 0, dispatch: 0 });

  useEffect(() => {
    setRerenderCounts(old => ({ ...old, state: old.state + 1 }));
  }, [state]);

  useEffect(() => {
    setRerenderCounts(old => ({ ...old, dispatch: old.dispatch + 1 }));
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div>
        <div>state: {state}</div>

        <button onClick={() => dispatch.increment()}>increment</button>
        <button onClick={() => dispatch.add(10)}>add 10</button>
        <div>
          <div>state re-render counts: {rerenderCounts.state}</div>
          <div>dispatch re-render counts: {rerenderCounts.dispatch}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
