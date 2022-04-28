import React from 'react';

import type { CaseReducers } from './createReducer';

export type ActionWithPayload<P extends any[]> = (...payload: P) => void;
export type ActionWithoutPayload = () => void;

export type ActionFromCR<S, CR> = CR extends (state: S) => S
  ? ActionWithoutPayload
  : CR extends (state: S, ...payload: infer P) => S
  ? ActionWithPayload<P>
  : ActionWithoutPayload;

export type ActionsFromCRs<S, CRs extends CaseReducers<S>> = {
  [Type in keyof CRs]: ActionFromCR<S, CRs[Type]>;
};

export default function createActions<S, CRs extends CaseReducers<S>>(
  reactDispatch: React.Dispatch<any>,
  caseReducers: CRs
): ActionsFromCRs<S, CRs> {
  const reducerNames = Object.keys(caseReducers);
  const dispatch = {} as any;
  reducerNames.forEach(reducerName => {
    dispatch[reducerName] = function (...args: any[]) {
      reactDispatch({ type: reducerName, payload: args });
    };
  });

  return dispatch;
}
