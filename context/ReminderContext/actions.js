import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { v5 as uuidv5 } from 'uuid';

import createActions, { createActionConsts } from '../../hooks/createActions';

export const REMINDER_ACTIONS = createActionConsts([
  'DELETE_REMINDER',
  'UPDATE_REMINDER',
  'SELECT_REMINDER',
  'RESET_SELECTED_REMINDER',
  'GET_REMINDER',
  'GET_ALL_REMINDERS',
  'REMINDER_ERROR',
]);

// Creates a reminder or updates an existing one, depending on whether
// reminder.id is present.
const updateReminder = (dispatch) => async (reminder) => {
  try {
    if (!reminder.id) {
      let id = uuidv5(reminder.label, uuidv5.URL);
      reminder.id = id;
      reminder.createdAt = new Date().toISOString();
      reminder.lastNotificationAt = new Date().toISOString();
    }
    reminder.updatedAt = new Date().toISOString();
    const serialized = JSON.stringify(reminder);
    await AsyncStorage.setItem(reminder.id, serialized);
    dispatch({
      type: REMINDER_ACTIONS.UPDATE_REMINDER,
      payload: { reminder },
    });
    // TODO: Move this into its own function ????
    // TODO: add logic so you dont get a ton of notifs
    const timeInSeconds = parseInt(reminder.time) * 24 * 60 * 60;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${reminder.label}`,
        body: 'time to attend to your new bloom! 🌸',
      },
      trigger: { seconds: timeInSeconds },
    });
  } catch (error) {
    dispatch({
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    });
  }
};

const deleteReminder = (dispatch) => async (id) => {
  try {
    await AsyncStorage.removeItem(id);
    dispatch({
      type: REMINDER_ACTIONS.DELETE_REMINDER,
      payload: { id },
    });
  } catch (error) {
    dispatch({
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    });
  }
};

const selectReminder = (dispatch) => (id) =>
  dispatch({ type: REMINDER_ACTIONS.SELECT_REMINDER, payload: { id } });

const resetSelectedReminder = (dispatch) => () =>
  dispatch({ type: REMINDER_ACTIONS.RESET_SELECTED_REMINDER });

const getAllReminders = (dispatch) => async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    // Unnests arrays of initial array and parses the reminders
    const reminders = result
      .map((res) => JSON.parse(res[1]))
      .reduce((acc, reminder) => {
        acc[reminder.id] = reminder;
        return acc;
      }, {});

    dispatch({
      type: REMINDER_ACTIONS.GET_ALL_REMINDERS,
      payload: {
        reminders,
      },
    });
  } catch (error) {
    dispatch({
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    });
  }
};

const getReminder = (dispatch) => async (id) => {
  try {
    const result = await AsyncStorage.getItem(id);
    const reminder = result ? JSON.parse(result) : null;
    dispatch({
      type: REMINDER_ACTIONS.GET_REMINDER,
      payload: {
        reminders: [reminder],
      },
    });
  } catch (error) {
    dispatch({
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    });
  }
};

// Actions
const createReminderActions = createActions({
  createReminder: updateReminder,
  deleteReminder,
  selectReminder,
  updateReminder,
  resetSelectedReminder,
  getReminder,
  getAllReminders,
});

export default createReminderActions;
