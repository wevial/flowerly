import { createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VIEWS } from '../constants';

export const RemindersContext = createContext(VIEWS.main);
export const RemindersDispatchContext = createContext(null);

export const REMINDERS_ACTIONS = {
  get: 'get',
  delete: 'delete',
  update: 'update',
  create: 'create',
};

export const RemindersProvider = ({ children }) => {
  const [reminders, dispatch] = useReducer(remindersReducer, VIEWS.main);

  return (
    <RemindersContext.Provider value={reminders}>
      <RemindersDispatchContext.Provider value={dispatch}>
        {children}
      </RemindersDispatchContext.Provider>
    </RemindersContext.Provider>
  );
};

export const useReminders = () => useContext(RemindersContext);

export const useRemindersDispatch = () => useContext(RemindersDispatchContext);

const createReminderReducer = async () => {
  const reminder = { id: 0, label: 'begonia listada', period: 3 };
  try {
    const serialized = JSON.stringify(reminder);
    await AsyncStorage.setItem('reminder1', serialized);
  } catch (e) {
    console.log('error from creating reminder', e);
  }
};

const getReminderReducer = async () => {
  try {
    const reminder = await AsyncStorage.getItem('reminder1');
    return reminder ? JSON.parse(reminder) : null;
  } catch (e) {
    console.log('error from getting reminder');
  }
};

// Action is in the form of {type: ACTION_TYPE, payload: DATA /* optional */}
export const remindersReducer = (reminders, action) => {
  switch (action.type) {
    case REMINDERS_ACTIONS.delete:
      return VIEWS.main;
    case REMINDERS_ACTIONS.create:
      return VIEWS.create;
    case REMINDERS_ACTIONS.update:
      return VIEWS.edit;
    case REMINDERS_ACTIONS.get:
    default:
      return VIEWS.main;
  }
};
