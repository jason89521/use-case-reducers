import type { CaseReducers } from './createReducer';

function createCaseReducers<S, CRs extends CaseReducers<S>>(state: S, caseReducers: CRs) {
  return caseReducers;
}

export default createCaseReducers;
