import { useReducer, useRef } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { DispatcherFromCRs } from './createDispatcher';
import createDispatch from './createDispatcher';

function useCaseReducer<State, CRs extends CaseReducers<State>>(
  caseReducers: CRs,
  initialState: State
): [State, DispatcherFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initArg: Arg,
  init: (arg: Arg) => State
): [State, DispatcherFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: State | Arg,
  init?: (arg: Arg) => State
): [State, DispatcherFromCRs<State, CRs>] {
  const reducer = useRef(createReducer(caseReducers)).current;
  const [state, reactDispatch] = useReducer(reducer, initialState as any, init as any);
  const dispatch = useRef(createDispatch<State, CRs>(reactDispatch, caseReducers)).current;

  return [state, dispatch];
}

export default useCaseReducer;
