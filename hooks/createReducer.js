const createReducer =
  (initialState = {}, actions = {}) =>
  (state = initialState, action) => {
    const { type, payload } = action;
    const actionReducer = actions[type];
    return actionReducer ? actionReducer(state, payload) : state;
  };

export default createReducer;
