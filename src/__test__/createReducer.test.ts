import { createReducer } from '..';
import caseReducers from './caseReducers';

describe('Generate a correct reducer', () => {
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

  test('Test the non-exist case reducer', () => {
    const action = { type: 'error', payload: [] };
    expect(() => reducer(initialState, action)).toThrow('The case reducer does not exist.');
  });
});
