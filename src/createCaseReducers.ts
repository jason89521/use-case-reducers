import type { CaseReducers } from './createReducer';

function createCaseReducers<S, CRs extends CaseReducers<S>>(initialState: S, caseReducers: CRs) {
  return { initialState, caseReducers };
}

export default createCaseReducers;
