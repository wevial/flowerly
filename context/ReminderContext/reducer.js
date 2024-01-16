import { REMINDER_ACTIONS } from './actions';

export const initialState = {
  reminders: {},
  reminderToEdit: null,
  error: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  console.log('\n\nREDUCING', type /* payload.reminders */);
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
    case REMINDER_ACTIONS.EDIT_REMINDER:
      console.log(state.reminders);
      const reminderToEdit = state.reminders[payload.id];
      console.log('editing reminder', reminderToEdit);
      return {
        ...state,
        reminderToEdit,
        error: null,
      };
    case REMINDER_ACTIONS.GET_ALL_REMINDERS:
      // console.log('GETTING ALL REMINDERS', Object.keys(payload.reminders));
      // const allReminders = payload.reminders.reduce((acc, reminder) => {
      // allReminders[reminder.id] = reminder;
      // }, {});
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
