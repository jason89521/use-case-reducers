import React, { useReducer, useState } from 'react';

import type { CaseReducers } from './createReducer';
import createReducer from './createReducer';

import type { ActionsFromCRs } from './createActions';
import createActions from './createActions';

function useCaseReducer<State, CRs extends CaseReducers<State>>(
  caseReducers: CRs,
  initialState: State
): [State, React.Dispatch<any>, ActionsFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initArg: Arg,
  init: (arg: Arg) => State
): [State, React.Dispatch<any>, ActionsFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: State | Arg,
  init?: (arg: Arg) => State
): [State, React.Dispatch<any>, ActionsFromCRs<State, CRs>] {
  const [reducer] = useState(() => createReducer(caseReducers));
  const [state, dispatch] = useReducer(reducer, initialState, init as any);
  const [actions] = useState(() => createActions<State, CRs>(caseReducers));

  return [state, dispatch, actions];
}

export default useCaseReducer;
