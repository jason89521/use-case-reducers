import { useReducer, useRef } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { ActionsFromCRs } from './createActions';
import createActions from './createActions';

function useCaseReducer<State, CRs extends CaseReducers<State>>(
  caseReducers: CRs,
  initialState: State
): [State, ActionsFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initArg: Arg,
  init: (arg: Arg) => State
): [State, ActionsFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: State | Arg,
  init?: (arg: Arg) => State
): [State, ActionsFromCRs<State, CRs>] {
  const reducer = useRef(createReducer(caseReducers)).current;
  const [state, reactDispatch] = useReducer(reducer, initialState as any, init as any);
  const dispatch = useRef(createActions<State, CRs>(reactDispatch, caseReducers)).current;

  return [state, dispatch];
}

export default useCaseReducer;
