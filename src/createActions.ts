import type { CaseReducers } from './createCaseReducers';

export type Action<P extends any[] = any[]> = { type: string; payload: P };
export type ActionCreator<P extends any[] = any[]> = (...payload: P) => Action<P>;

export type ActionFromCR<S, CR> = CR extends (state: S) => S | void
  ? ActionCreator
  : CR extends (state: S, ...payload: infer P) => S | void
  ? ActionCreator<P>
  : ActionCreator;

export type ActionsFromCRs<S, CRs extends CaseReducers<S>> = {
  [Type in keyof CRs]: ActionFromCR<S, CRs[Type]>;
};

export default function createActions<S = any, CRs extends CaseReducers<S> = CaseReducers<any>>(
  caseReducers: CRs
): ActionsFromCRs<S, CRs> {
  const reducerNames = Object.keys(caseReducers);
  const actions = {} as any;
  reducerNames.forEach(reducerName => {
    actions[reducerName] = (...args: any[]) => ({ type: reducerName, payload: args });
  });

  return actions;
}
