import { createContext, useContext, useReducer } from 'react';
import { VIEWS } from '../constants';

// export const ModeContext = createContext(null);
export const ModeContext = createContext(VIEWS.main);
export const ModeDispatchContext = createContext(null);

export const modeActions = {
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
    case modeActions.main:
      return VIEWS.main;
    case modeActions.create:
      return VIEWS.create;
    case modeActions.edit:
      return VIEWS.edit;
    default:
      return VIEWS.main;
  }
};
