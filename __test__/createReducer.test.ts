import { createReducer } from '../src';

type State = {
  count: number;
};

const caseReducers = {
  reset: () => {
    return { count: 0 };
  },
  increment: (state: State) => {
    return { count: state.count + 1 };
  },
  add: (state: State, amount: number) => {
    return { count: state.count + amount };
  },
  addTwo: (state: State, amount1: number, amount2: number) => {
    return { count: state.count + amount1 + amount2 };
  },
};

describe('Test all types of case reducers', () => {
  const reducer = createReducer(caseReducers);
  const initialState = { count: 10 };

  test('Test the case reducer with zero parameter', () => {
    const action = { type: 'reset', payload: [] };
    const newState = reducer(initialState, action);
    expect(newState.count).toBe(0);
  });

  test('Test the case reducer with one parameter', () => {
    const action = { type: 'increment', payload: [] };
    const newState = reducer(initialState, action);
    expect(newState.count).toBe(11);
  });

  test('Test the case reducer with 2 parameter', () => {
    const action = { type: 'add', payload: [10] };
    const newState = reducer(initialState, action);
    expect(newState.count).toBe(20);
  });

  test('Test the case reducer with more than 2 parameter', () => {
    const action = { type: 'addTwo', payload: [10, 10] };
    const newState = reducer(initialState, action);
    expect(newState.count).toBe(30);
  });
});
