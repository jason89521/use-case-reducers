import React from 'react';

import type { CaseReducers } from './createReducer';

export type ActionDispatcherWithPayload<P = any> = (payload: P) => void;
export type ActionDispatcherWithoutPayload = () => void;

export type ActionDispatcherFromCR<S, CR> = CR extends (state: S) => S
  ? ActionDispatcherWithoutPayload
  : CR extends (state: S, payload: infer P) => S
  ? ActionDispatcherWithPayload<P>
  : ActionDispatcherWithPayload;

export type DispatchFromCRs<S, CRs extends CaseReducers<S>> = {
  [Type in keyof CRs]: ActionDispatcherFromCR<S, CRs[Type]>;
};

export default function createDispatch<S, CRs extends CaseReducers<S>>(
  reactDispatch: React.Dispatch<any>,
  caseReducers: CRs
): DispatchFromCRs<S, CRs> {
  const reducerNames = Object.keys(caseReducers);
  const dispatch = {} as any;
  reducerNames.forEach(reducerName => {
    dispatch[reducerName] = function (...args: any[]) {
      reactDispatch({ type: reducerName, payload: args[0] });
    };
  });

  return dispatch;
}
