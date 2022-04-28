import { useReducer } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { DispatchFromCRs } from './createDispatch';
import createDispatch from './createDispatch';

function emptyReducer(state: any) {
  return state;
}

function useCaseReducer<State, CRs extends CaseReducers<State>>(
  caseReducers: CRs,
  initialState: State
): [State, DispatchFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initArg: Arg,
  init: (arg: Arg) => State
): [State, DispatchFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: State | Arg,
  init?: (arg: Arg) => State
): [State, DispatchFromCRs<State, CRs>] {
  const [reducer] = useReducer(emptyReducer, caseReducers, createReducer as any);
  const [state, reactDispatch] = useReducer(reducer as any, initialState as any, init as any);
  const [dispatch] = useReducer(
    emptyReducer,
    { reactDispatch, caseReducers },
    createDispatch as any
  );

  return [state as any, dispatch as any];
}

export default useCaseReducer;
