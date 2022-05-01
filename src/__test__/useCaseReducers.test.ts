import { renderHook, act } from '@testing-library/react-hooks';
import useCaseReducers from '../';
import { initialState, caseReducers } from './caseReducers';

test('Update state correctly with actions', () => {
  const { result } = renderHook(() => useCaseReducers(caseReducers, initialState));

  act(() => {
    const [s, dispatch, { increment }] = result.current;
    dispatch(increment());
  });
  expect(result.current[0].count).toBe(1);

  act(() => {
    const [s, dispatch, { reset }] = result.current;
    dispatch(reset());
  });
  expect(result.current[0].count).toBe(0);

  act(() => {
    const [s, dispatch, { add }] = result.current;
    dispatch(add(10));
  });
  expect(result.current[0].count).toBe(10);

  act(() => {
    const [s, dispatch, { addTwo }] = result.current;
    dispatch(addTwo(10, 20));
  });
  expect(result.current[0].count).toBe(40);
});
