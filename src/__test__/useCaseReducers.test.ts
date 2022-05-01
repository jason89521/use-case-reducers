import { renderHook } from '@testing-library/react-hooks';
import useCaseReducers from '../';
import { initialState, caseReducers } from './caseReducers';

test('should ', () => {
  const { result } = renderHook(() => useCaseReducers(caseReducers, initialState));
  const [state, dispatch, actions] = result.current;
  expect(state.count).toBe(0);
});
