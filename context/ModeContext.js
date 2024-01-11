import { createContext, useReducer } from 'react';
import { VIEWS } from '../constants';

export const ModeContext = createContext(VIEWS.main);

export const modeActions = {
  main: 'main',
  edit: 'edit',
  create: 'create',
};

export const modeReducer = (mode, action) => {
  switch (action.type) {
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

export default ModeContext;
// convert to dictionary to export, make it easy :D
