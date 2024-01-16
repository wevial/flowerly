import { createContext, useContext } from 'react';
import reminderReducer, { initialState } from './reducer';
import createReminderActions from './actions';
import { useAsyncReducer } from '../../hooks/useAsyncReducer';

export const RemindersContext = createContext(null);

const RemindersProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reminderReducer, initialState);
  const actions = createReminderActions(dispatch);
  console.log(actions);

  return (
    <RemindersContext.Provider value={[state, actions]}>
      {children}
    </RemindersContext.Provider>
  );
};

export default RemindersProvider;
