import React, { useReducer, useState } from 'react';

import type { CaseReducers } from './createCaseReducers';
import type { Action, ActionsFromCRs } from './createActions';
import createReducer from './createReducer';
import createActions from './createActions';

function useCaseReducer<State, CRs extends CaseReducers<State>>(
  caseReducers: CRs,
  initialState: State
): [State, React.Dispatch<Action>, ActionsFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initArg: Arg,
  init: (arg: Arg) => State
): [State, React.Dispatch<Action>, ActionsFromCRs<State, CRs>];

function useCaseReducer<State, CRs extends CaseReducers<State>, Arg>(
  caseReducers: CRs,
  initialState: State | Arg,
  init?: (arg: Arg) => State
): [State, React.Dispatch<Action>, ActionsFromCRs<State, CRs>] {
  const [reducer] = useState(() => createReducer(caseReducers));
  const [state, dispatch] = useReducer(reducer, initialState, init as any);
  const [actions] = useState(() => createActions<State, CRs>(caseReducers));

  return [state, dispatch, actions];
}

export const dispatch: React.Dispatch<Action> = () => {
  throw new Error(
    "This function is provided for context default only. It seems that your app doesn't have a context provider."
  );
};

export default useCaseReducer;
