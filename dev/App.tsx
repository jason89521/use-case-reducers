import React, { useEffect, useState } from 'react';

import useCaseReducers, { createCaseReducers } from '../src';

const init = (count: number) => {
  return { count };
};

const { caseReducers } = createCaseReducers(
  { count: 0 },
  {
    increment: state => {
      state.count += 1;
    },
    add: (state, amount: number) => {
      state.count += amount;
    },
    addWithMsg: (state, amount: number, msg: string) => {
      console.log(msg);
      state.count += amount;
    },
  }
);

function App() {
  const [state, dispatch, { add, increment, addWithMsg }] = useCaseReducers(caseReducers, 0, init);
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
        <div>state: {state.count}</div>

        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(add(10))}>add 10</button>
        <button onClick={() => dispatch(addWithMsg(10, 'add with 10'))}>add with msg</button>
        <div>
          <div>state re-render counts: {rerenderCounts.state}</div>
          <div>dispatch re-render counts: {rerenderCounts.dispatch}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
