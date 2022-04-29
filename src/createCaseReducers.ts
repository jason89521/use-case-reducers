export type CaseReducer<S, Args extends any[] = any[]> = (state: S, ...payload: Args) => S;
export type CaseReducers<S> = Record<string, CaseReducer<S>>;

function createCaseReducers<S, CRs extends CaseReducers<S>>(initialState: S, caseReducers: CRs) {
  return { initialState, caseReducers };
}

export default createCaseReducers;
