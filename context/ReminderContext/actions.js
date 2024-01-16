import AsyncStorage from '@react-native-async-storage/async-storage';
import { v5 as uuidv5 } from 'uuid';

const CREATE_REMINDER = 'CREATE_REMINDER';
const EDIT_REMINDER = 'EDIT_REMINDER';
const GET_ALL_REMINDERS = 'GET_ALL_REMINDERS';
const GET_REMINDER = 'GET_REMINDER';
const REMINDER_ERROR = 'REMINDER_ERROR';

export const REMINDER_ACTIONS = {
  CREATE_REMINDER,
  EDIT_REMINDER,
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
    console.log('created reminder', reminder);
    dispatch({
      type: REMINDER_ACTIONS.CREATE_REMINDER,
      reminders: [reminder],
    });
  } catch (error) {
    console.log('error from creating reminder', error.message);
    dispatch({
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    });
  }
};

const editReminder = (dispatch) => (id) =>
  dispatch({ type: REMINDER_ACTIONS.EDIT_REMINDER, payload: { id } });

const getAllReminders = (dispatch) => async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    // Unnests arrays of initial array and parses the reminders
    // const reminders = result.map((res) => JSON.parse(res[1]));
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
    console.log('error from getting reminders', error.message);
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
    console.log('error from getting reminder', e.message);
    return {
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    };
  }
};

// Actions
const createReminderActions = (dispatch) => ({
  createReminder: createReminder(dispatch),
  editReminder: editReminder(dispatch),
  getReminder: getReminder(dispatch),
  getAllReminders: getAllReminders(dispatch),
  getBaseReminder: async () => {
    try {
      console.log('getting reminder');
      const result = await AsyncStorage.getItem('reminder1');
      const reminder = result ? JSON.parse(result) : null;
      console.log('reminder', reminder);
      if (!reminder) {
        throw 'no reminder found';
      }
      dispatch({
        type: REMINDER_ACTIONS.GET_REMINDER,
        payload: {
          reminders: [reminder],
        },
      });
    } catch (error) {
      console.log('error from getting reminder', error.message);
      dispatch({
        type: REMINDER_ACTIONS.REMINDER_ERROR,
        payload: { error: error.message },
      });
    }
  },
});

export default createReminderActions;
