import { createContext } from 'react';
import reducer, { initialState } from './reducer';
import createReminderActions from './actions';
import { useAsyncReducer } from '../../hooks/useAsyncReducer';

export const RemindersContext = createContext(null);

const RemindersProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState);
  const actions = createReminderActions(dispatch);

  return (
    <RemindersContext.Provider value={[state, actions]}>
      {children}
    </RemindersContext.Provider>
  );
};

export default RemindersProvider;
