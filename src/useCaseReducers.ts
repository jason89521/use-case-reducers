import { useReducer, useRef } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { DispatchFromCRs } from './createDispatch';
import createDispatch from './createDispatch';

function useCaseReducer<State, CRs extends CaseReducers<State>>(
  caseReducers: CRs,
  initialState: State
): [State, DispatchFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: Arg,
  init: (arg: Arg) => State
): [State, DispatchFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: State | Arg,
  init?: (arg: Arg) => State
): [State, DispatchFromCRs<State, CRs>] {
  const reducer = useRef(createReducer(caseReducers)).current;
  const [state, reactDispatch] = useReducer(reducer, initialState as any, init as any);
  const dispatch = useRef(createDispatch<State, CRs>(reactDispatch, caseReducers)).current;

  return [state, dispatch];
}

export default useCaseReducer;
