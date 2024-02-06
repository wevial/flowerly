import { REMINDER_ACTIONS } from './actions';
import createReducer from '../../hooks/createReducer';

export const initialState = {
  reminders: {},
  selectedReminder: null,
  error: null,
  notification: null,
};

const updateReminderReducer = (state, payload) => {
  const reminders = state?.reminders ? { ...state.reminders } : {};
  reminders[payload.reminder.id] = payload.reminder;
  console.log('updateReminderReducer', reminders);
  // debugger;
  return {
    reminders,
    selectedReminder: null,
    error: null,
  };
};

const deleteReminderReducer = (state, payload) => {
  const reminders = state?.reminders ? { ...state.reminders } : {};
  delete reminders[payload.id];
  const selectedReminder =
    state?.selectedReminder?.id === payload.id ? null : state.selectedReminder;
  return {
    reminders,
    selectedReminder,
    error: null,
    notification: null,
  };
};

const selectedReminderReducer = (state, payload) => ({
  ...state,
  selectedReminder: state.reminders[payload.id],
  error: null,
  notification: null,
});

const resetSelectedReminderReducer = (state) => ({
  ...state,
  selectedReminder: null,
  error: null,
  notification: null,
});

const getAllRemindersReducer = (state, payload) => ({
  ...state,
  reminders: payload.reminders,
  error: null,
  notification: null,
});

const getReminderReducer = (state, payload) => ({
  ...state,
  reminders: payload.reminders,
  error: null,
  notification: null,
});

const reminderErrorReducer = (state, payload) => ({
  ...state,
  error: payload.error,
});

const setNotificationReducer = (state, payload) => {
  console.log('setNotificationReducer', state, payload);
  return { ...state, notification: payload.notification, error: null };
};

const reducer = createReducer(initialState, {
  [REMINDER_ACTIONS.UPDATE_REMINDER]: updateReminderReducer,
  [REMINDER_ACTIONS.DELETE_REMINDER]: deleteReminderReducer,
  [REMINDER_ACTIONS.SELECT_REMINDER]: selectedReminderReducer,
  [REMINDER_ACTIONS.RESET_SELECTED_REMINDER]: resetSelectedReminderReducer,
  [REMINDER_ACTIONS.GET_ALL_REMINDERS]: getAllRemindersReducer,
  [REMINDER_ACTIONS.GET_REMINDER]: getReminderReducer,
  [REMINDER_ACTIONS.REMINDER_ERROR]: reminderErrorReducer,
  // notifications
  [REMINDER_ACTIONS.SET_NOTIFICATION]: setNotificationReducer,
});

export default reducer;
