import { REMINDER_ACTIONS } from './actions';
import createReducer from '../../hooks/createReducer';

export const initialState = {
  reminders: {},
  selectedReminder: null,
  error: null,
};

const createReminderReducer = (state, payload) => {
  const reminders = state?.reminders ? { ...state.reminders } : {};
  reminders[payload.reminder.id] = payload.reminder;
  return {
    ...state,
    reminders,
    error: null,
  };
};

const updateReminderReducer = (state, payload) => {
  const reminders = state?.reminders ? { ...state.reminders } : {};
  reminders[payload.reminder.id] = payload.reminder;
  return {
    reminders,
    selectedReminder: null,
    error: null,
  };
};

const deleteReminderReducer = (state, payload) => {
  const reminders = state?.reminders ? { ...state.reminders } : {};
  delete reminders[payload.id];
  return {
    reminders,
    selectedReminder: null,
    error: null,
  };
};

const selectedReminderReducer = (state, payload) => ({
  ...state,
  selectedReminder: state.reminders[payload.id],
  error: null,
});

const resetSelectedReminderReducer = (state) => ({
  ...state,
  selectedReminder: null,
  error: null,
});

const getAllRemindersReducer = (state, payload) => ({
  ...state,
  reminders: payload.reminders,
  error: null,
});

const getReminderReducer = (state, payload) => ({
  ...state,
  reminders: payload.reminders,
  error: null,
});

const reminderErrorReducer = (state, payload) => ({
  ...state,
  error: payload.error,
});

const reducer = createReducer(initialState, {
  [REMINDER_ACTIONS.CREATE_REMINDER]: createReminderReducer,
  [REMINDER_ACTIONS.UPDATE_REMINDER]: updateReminderReducer,
  [REMINDER_ACTIONS.DELETE_REMINDER]: deleteReminderReducer,
  [REMINDER_ACTIONS.SELECT_REMINDER]: selectedReminderReducer,
  [REMINDER_ACTIONS.RESET_SELECTED_REMINDER]: resetSelectedReminderReducer,
  [REMINDER_ACTIONS.GET_ALL_REMINDERS]: getAllRemindersReducer,
  [REMINDER_ACTIONS.GET_REMINDER]: getReminderReducer,
  [REMINDER_ACTIONS.REMINDER_ERROR]: reminderErrorReducer,
});

export default reducer;
