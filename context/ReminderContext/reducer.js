import { REMINDER_ACTIONS } from './actions';

const initialState = { reminders: [], error: null };

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case REMINDER_ACTIONS.CREATE_REMINDER:
      return { ...state, error: null };
    case REMINDER_ACTIONS.GET_REMINDER:
      return { ...state, reminders: payload.reminders, error: null };
    case REMINDER_ACTIONS.REMINDER_ERROR:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
