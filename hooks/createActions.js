export const createActionConsts = (actionList = []) =>
  actionList.reduce((acc, action) => {
    acc[action] = action;
    return acc;
  }, {});

const createActions = (actionList) => (dispatch) => {
  const actions = {};
  Object.entries(actionList).forEach(([key, action]) => {
    actions[key] = action(dispatch);
  });
  return actions;
};

export default createActions;
