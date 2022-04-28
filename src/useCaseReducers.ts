import { useReducer } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { DispatchFromCRs, ArgOfCreateDispatch } from './createDispatch';
import createDispatch from './createDispatch';

function emptyReducerForCreateReducer<S>(state: CaseReducers<S>) {
  return state;
}

function emptyDispatchReducer<S, CRs extends CaseReducers<S>>(state: ArgOfCreateDispatch<S, CRs>) {
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
  const [reducer] = useReducer(emptyReducerForCreateReducer, caseReducers, createReducer as any);
  const [state, reactDispatch] = useReducer(reducer as any, initialState as any, init as any);
  const [dispatch] = useReducer(
    emptyDispatchReducer,
    { reactDispatch, caseReducers },
    createDispatch as any
  );

  return [state as any, dispatch as any];
}

export default useCaseReducer;
