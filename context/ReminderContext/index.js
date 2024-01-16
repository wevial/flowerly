import { createContext, useContext } from 'react';

import { useAsyncReducer } from '../../hooks/useAsyncReducer';

export const RemindersContext = createContext([]);

export const RemindersProvider = ({ children }) => {
  const [reminders, dispatch] = useAsyncReducer(reducer, initialState);
  const actions = createReminderActions(dispatch);

  return (
    <RemindersContext.Provider value={[state, actions]}>
      {children}
    </RemindersContext.Provider>
  );
};
