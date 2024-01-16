const CREATE_REMINDER = 'CREATE_REMINDER';
const GET_ALL_REMINDERS = 'GET_ALL_REMINDERS';

export const REMINDER_ACTIONS = { CREATE_REMINDER, GET_ALL_REMINDERS };

// Reminder actions
const createReminderActions = (dispatch) => ({
  getAll: () => {
    dispatch({ type: REMINDER_ACTIONS.getAll });
  },
});

export default createReminderActions;
