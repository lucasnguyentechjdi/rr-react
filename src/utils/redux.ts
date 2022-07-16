type actionType = {
  type: string;
}

export const createReducer = <T, K extends actionType>(initialState: T, handlers: { [key: string]: Function }) => {
  return (state = initialState, action: K): T => {
    if (action.type in handlers)  {
      return handlers[action.type](state, action);
    }

    return state;
  }
}
