import React, { useEffect, useState, useContext, createContext, useReducer } from 'react';

import useCaseReducers, { createCaseReducers, createActions, createSlice, dispatch } from '../src';

const init = (count: number) => {
  return count;
};

const { caseReducers } = createCaseReducers(0, {
  increment: state => state + 1,
  add: (state, amount: number) => state + amount,
  addWithMsg: (state, amount: number, msg: string) => {
    console.log(msg);
    return state + amount;
  },
});

const actions = createActions<number, typeof caseReducers>(caseReducers);

const slice = createSlice(0, caseReducers);

const Context = createContext({ dispatch, actions });

function App() {
  const [state, dispatch, { add, increment }] = useCaseReducers(caseReducers, 0, init);

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

        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(add(10))}>add 10</button>
        <div>
          <div>state re-render counts: {rerenderCounts.state}</div>
          <div>dispatch re-render counts: {rerenderCounts.dispatch}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
