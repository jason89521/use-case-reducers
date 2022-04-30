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

export default caseReducers;
