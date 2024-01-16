const initialState = { reminders: [] };

const reducer = (state, action) => {
  // TODO: use async/await instead of setTimeout
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (action.type) {
        case 'get':
          resolve({ ...state, reminders: action.payload });
          break;
        default:
          resolve(state);
          break;
      }
    }, 1000);
  });
};

export default reducer;
