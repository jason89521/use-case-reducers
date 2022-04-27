import React from 'react';

import type { CaseReducers } from './createReducer';

export type ActionDispatcherWithPayload<P extends any[]> = (...payload: P) => void;
export type ActionDispatcherWithoutPayload = () => void;

export type ActionDispatcherFromCR<S, CR> = CR extends (state: S) => S
  ? ActionDispatcherWithoutPayload
  : CR extends (state: S, ...payload: infer P) => S
  ? ActionDispatcherWithPayload<P>
  : ActionDispatcherWithoutPayload;

export type DispatcherFromCRs<S, CRs extends CaseReducers<S>> = {
  [Type in keyof CRs]: ActionDispatcherFromCR<S, CRs[Type]>;
};

export default function createDispatcher<S, CRs extends CaseReducers<S>>(
  reactDispatch: React.Dispatch<any>,
  caseReducers: CRs
): DispatcherFromCRs<S, CRs> {
  const reducerNames = Object.keys(caseReducers);
  const dispatch = {} as any;
  reducerNames.forEach(reducerName => {
    dispatch[reducerName] = function (...args: any[]) {
      reactDispatch({ type: reducerName, payload: args });
    };
  });

  return dispatch;
}
