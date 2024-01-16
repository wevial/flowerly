import AsyncStorage from '@react-native-async-storage/async-storage';

const CREATE_REMINDER = 'CREATE_REMINDER';
const GET_ALL_REMINDERS = 'GET_ALL_REMINDERS';
const GET_REMINDER = 'GET_REMINDER';
const REMINDER_ERROR = 'REMINDER_ERROR';

export const REMINDER_ACTIONS = {
  CREATE_REMINDER,
  GET_REMINDER,
  GET_ALL_REMINDERS,
  REMINDER_ERROR,
};

// Reminder actions
const createReminder = (dispatch) => async (dispatch) => {
  try {
    const reminder = { id: 'reminder1', label: 'begonia listada', period: 3 };
    const serialized = JSON.stringify(reminder);
    await AsyncStorage.setItem('reminder1', serialized);
    return {
      type: REMINDER_ACTIONS.CREATE_REMINDER,
    };
  } catch (error) {
    console.log('error from creating reminder', error.message);
    return {
      type: REMINDER_ACTIONS.REMINDER_ERROR,
      payload: { error: error.message },
    };
  }
};

const getReminder = (dispatch) => async (dispatch) => {
  try {
    const result = await AsyncStorage.getItem('reminder1');
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
  createReminder: async () => {
    try {
      const reminder = { id: 'reminder1', label: 'begonia listada', period: 3 };
      const serialized = JSON.stringify(reminder);
      await AsyncStorage.setItem('reminder1', serialized);
      dispatch({
        type: REMINDER_ACTIONS.CREATE_REMINDER,
      });
    } catch (error) {
      console.log('error from creating reminder', error.message);
      dispatch({
        type: REMINDER_ACTIONS.REMINDER_ERROR,
        payload: { error: error.message },
      });
    }
  },
  getReminder: async () => {
    try {
      const result = await AsyncStorage.getItem('reminder1');
      const reminder = result ? JSON.parse(result) : null;
      dispatch({
        type: REMINDER_ACTIONS.GET_REMINDER,
        payload: {
          reminders: [reminder],
        },
      });
    } catch (error) {
      console.log('error from getting reminder', e.message);
      dispatch({
        type: REMINDER_ACTIONS.REMINDER_ERROR,
        payload: { error: error.message },
      });
    }
  },
});

export default createReminderActions;
