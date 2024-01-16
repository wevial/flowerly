import { REMINDER_ACTIONS } from './actions';

export const initialState = { reminders: {}, error: null };

const reducer = (state, action) => {
  const { type, payload } = action;
  console.log('REDUCING', type, payload);
  switch (action.type) {
    case REMINDER_ACTIONS.CREATE_REMINDER:
      const reminders = state.reminders ? { ...state.reminders } : {};
      payload.reminders.map((reminder) => {
        reminders[reminder.id] = reminder;
      });
      return {
        ...state,
        reminders: reminders,
        error: null,
      };
    case REMINDER_ACTIONS.GET_ALL_REMINDERS:
      return { ...state, reminders: payload.reminders, error: null };
    case REMINDER_ACTIONS.GET_REMINDER:
      return { ...state, reminders: payload.reminders, error: null };
    case REMINDER_ACTIONS.REMINDER_ERROR:
      return { ...state, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
