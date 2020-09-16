import { AnyAction, combineReducers } from 'redux';
import produce, { Draft } from 'immer';

export type Context<S> = {
  initState: S;
  actions: {
    [actionType: string]: (draft: Draft<S>, action: AnyAction) => Draft<S> | void;
  };
};

export function toReducer<S>(context: Context<S>) {
  return (state = context.initState, action: AnyAction) => produce(state, (draft: Draft<S>) => {
    if (context.actions[action.type]) {
      return context.actions[action.type](draft, action);
    }
    return draft;
  });
}

const toReducerMap = (obj) => {
  const reducerMap = {};
  Object.keys(obj).forEach((key) => {
    reducerMap[key] = toReducer(obj[key]);
  });
  return reducerMap;
};

export function combineReducersFromContext(contextMap) {
  return combineReducers(toReducerMap(contextMap));
}
