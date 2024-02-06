import { createContext, useContext, useReducer } from 'react';
import { VIEWS } from '../utils/constants';

export const ModeContext = createContext(VIEWS.main);
export const ModeDispatchContext = createContext(null);

export const MODE_ACTIONS = {
  main: 'main',
  edit: 'edit',
  create: 'create',
};

export const ModeProvider = ({ children }) => {
  const [mode, dispatch] = useReducer(modeReducer, VIEWS.main);

  return (
    <ModeContext.Provider value={mode}>
      <ModeDispatchContext.Provider value={dispatch}>
        {children}
      </ModeDispatchContext.Provider>
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);

export const useModeDispatch = () => useContext(ModeDispatchContext);

export const modeReducer = (mode, action) => {
  switch (action) {
    case MODE_ACTIONS.main:
      return VIEWS.main;
    case MODE_ACTIONS.create:
      return VIEWS.create;
    case MODE_ACTIONS.edit:
      return VIEWS.edit;
    default:
      return VIEWS.main;
  }
};
