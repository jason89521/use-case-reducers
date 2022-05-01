import { createCaseReducers } from '../';

export const { initialState, caseReducers } = createCaseReducers(
  { count: 0 },
  {
    reset: () => {
      return { count: 0 };
    },
    increment: state => {
      return { count: state.count + 1 };
    },
    add: (state, amount: number) => {
      return { count: state.count + amount };
    },
    addTwo: (state, amount1: number, amount2: number) => {
      return { count: state.count + amount1 + amount2 };
    },
  }
);
