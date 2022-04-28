export type CaseReducer<S, Args extends any[] = any[]> = (state: S, ...payload: Args) => S;
export type CaseReducers<S> = Record<string, CaseReducer<S>>;

export default function createReducer<S>(caseReducers: CaseReducers<S>) {
  const reducer = (state: S, action: { type: string; payload: any[] }) => {
    const type = action.type;
    if (caseReducers[type] === undefined) throw new Error('The case reducer does not exist.');

    return caseReducers[type](state, ...action.payload);
  };

  return reducer;
}
