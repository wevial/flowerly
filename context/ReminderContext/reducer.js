import { REMINDER_ACTIONS } from './actions';

export const initialState = {
  reminders: {},
  // TODO: Change to "selectedReminder"
  reminderToEdit: null,
  error: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  console.log('\n\nREDUCING', type /* payload.reminders */);
  switch (action.type) {
    case REMINDER_ACTIONS.CREATE_REMINDER:
      let reminders = state.reminders ? { ...state.reminders } : {};
      payload.reminders.map((reminder) => {
        reminders[reminder.id] = reminder;
      });
      return {
        ...state,
        reminders: reminders,
        error: null,
      };
    case REMINDER_ACTIONS.UPDATE_REMINDER:
      reminders = state.reminders ? { ...state.reminders } : {};
      reminders[payload.reminder.id] = payload.reminder;
      return {
        reminders: reminders,
        reminderToEdit: null,
        error: null,
      };
    case REMINDER_ACTIONS.EDIT_REMINDER:
      console.log(state.reminders);
      const reminderToEdit = state.reminders[payload.id];
      console.log('editing reminder', Object.keys(reminderToEdit));
      return {
        ...state,
        reminderToEdit,
        error: null,
      };
    case REMINDER_ACTIONS.CANCEL_EDIT_REMINDER:
      return {
        ...state,
        reminderToEdit: null,
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
