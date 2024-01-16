import { createContext, useContext } from 'react';
import reminderReducer, { initialState } from './reducer';
import { useAsyncReducer } from '../../hooks/useAsyncReducer';

export const RemindersContext = createContext(null);

export const RemindersProvider = ({ children }) => {
  const [reminders, dispatch] = useAsyncReducer(reminderReducer, initialState);
  const actions = createReminderActions(dispatch);

  return (
    <RemindersContext.Provider value={[state, actions]}>
      {children}
    </RemindersContext.Provider>
  );
};
