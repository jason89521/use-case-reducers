import produce from 'immer';

import type { CaseReducers } from './createCaseReducers';
import type { Action } from './createActions';

export default function createReducer<S>(
  caseReducers: CaseReducers<S>
): (state: S, action: Action) => S {
  const reducer = produce((state: S, action: Action) => {
    const type = action.type;
    if (caseReducers[type] === undefined) throw new Error('The case reducer does not exist.');

    return caseReducers[type](state, ...action.payload);
  });

  return reducer as any;
}
