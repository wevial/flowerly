import AsyncStorage from '@react-native-async-storage/async-storage';
import { v5 as uuidv5 } from 'uuid';
import { createActions } from '../../hooks/createReducer';

const CREATE_REMINDER = 'CREATE_REMINDER';
const DELETE_REMINDER = 'DELETE_REMINDER';
const SELECT_REMINDER = 'SELECT_REMINDER';
const GET_ALL_REMINDERS = 'GET_ALL_REMINDERS';
const GET_REMINDER = 'GET_REMINDER';
const REMINDER_ERROR = 'REMINDER_ERROR';
const UPDATE_REMINDER = 'UPDATE_REMINDER';
const RESET_SELECTED_REMINDER = 'RESET_SELECTED_REMINDER';

export const REMINDER_ACTIONS = {
  DELETE_REMINDER,
  UPDATE_REMINDER,
  CREATE_REMINDER,
  SELECT_REMINDER,
  RESET_SELECTED_REMINDER,
  GET_REMINDER,
  GET_ALL_REMINDERS,
  REMINDER_ERROR,
};

// Reminder actions
const createReminder = (dispatch) => async (reminder) => {
  try {
    // const reminder = { id: 'reminder1', label: 'begonia listada', period: 3 };
    // ADD FUNCTION TO CREATE/TEST IDS but this should be fine lol
    let id = uuidv5(reminder.label, uuidv5.URL);
    reminder.id = id;
    const serialized = JSON.stringify(reminder);
    await AsyncStorage.setItem(id, serialized);
    dispatch({
      type: REMINDER_ACTIONS.CREATE_REMINDER,
      reminder,
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
    });
    // getAllReminders(dispatch);
  } catch (error) {
    dispatch({
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    });
  }
};

// TODO: Combine create and update reminder functions/actions. Just check if it has an id or not
const updateReminder = (dispatch) => async (reminder) => {
  try {
    const serialized = JSON.stringify(reminder);
    await AsyncStorage.setItem(reminder.id, serialized);
    dispatch({
      type: REMINDER_ACTIONS.UPDATE_REMINDER_REMINDER,
      reminder,
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
    return {
      type: REMINDER_ACTIONS.GET_REMINDER,
      payload: {
        reminders: [reminder],
      },
    };
  } catch (error) {
    return {
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    };
  }
};

const resetSelectedReminder = (dispatch) => () =>
  dispatch({ type: REMINDER_ACTIONS.RESET_SELECTED_REMINDER });

// Actions
const createReminderActions = (dispatch) => ({
  createReminder: createReminder(dispatch),
  deleteReminder: deleteReminder(dispatch),
  selectReminder: selectReminder(dispatch),
  updateReminder: updateReminder(dispatch),
  resetSelectedReminder: resetSelectedReminder(dispatch),
  getReminder: getReminder(dispatch),
  getAllReminders: getAllReminders(dispatch),
});

export default createReminderActions;
