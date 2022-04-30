import { createActions } from '..';
import caseReducers from './caseReducers';

test('Generate a correct actions object', () => {
  const actions = createActions(caseReducers);

  const { reset, increment, add, addTwo } = actions;
  expect(reset()).toEqual({ type: 'reset', payload: [] });
  expect(increment()).toEqual({ type: 'increment', payload: [] });
  expect(add(1)).toEqual({ type: 'add', payload: [1] });
  expect(addTwo(1, 2)).toEqual({ type: 'addTwo', payload: [1, 2] });
});
