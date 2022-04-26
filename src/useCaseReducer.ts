import { useReducer, useRef } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { DispatchFromCRs } from './createDispatch';
import createDispatch from './createDispatch';

export default function useCaseReducer<State, CRs extends CaseReducers<State>>(
  initialArg: State,
  caseReducers: CRs
): [State, DispatchFromCRs<State, CRs>] {
  const reducer = useRef(createReducer(caseReducers)).current;
  const [state, reactDispatch] = useReducer(reducer, initialArg);
  const dispatch = useRef(createDispatch<State, CRs>(reactDispatch, caseReducers)).current;

  return [state, dispatch];
}
