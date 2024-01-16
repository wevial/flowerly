import React from 'react';
import Edit from './Edit';
import Main from './Main';
import Create from './Create';
import { useMode } from '../context/mode';
import { VIEWS } from '../constants';

const SelectedView = () => {
  const mode = useMode();
  switch (mode) {
    case VIEWS.create:
      return <Create />;
    case VIEWS.edit:
      return <Edit />;
    case VIEWS.main:
    default:
      return <Main />;
  }
};

export default SelectedView;
