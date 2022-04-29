import createActions from './createActions';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

export default function createSlice<S, CRs extends CaseReducers<S>>(
  initialState: S,
  caseReducers: CRs
) {
  const reducer = createReducer(caseReducers);
  const actions = createActions<S, CRs>(caseReducers);

  return {
    initialState,
    reducer,
    actions,
  };
}
