export type CaseReducer<S, P = any> = (state: S, payload: P) => S;
export type CaseReducers<S> = Record<string, CaseReducer<S>>;

export default function createReducer<S>(caseReducers: CaseReducers<S>) {
  const reducerNames = Object.keys(caseReducers);
  const reducer = (state: S, action: { type: string; payload: any }) =>
    reducerNames.reduce((state, reducerName) => {
      if (action.type !== reducerName) return state;

      return caseReducers[reducerName](state, action.payload);
    }, state);

  return reducer;
}
