import { StatusBar } from 'expo-status-bar';
import React, { useContext, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TopBar from './components/TopBar';
import MainView from './views/Main';
import EditView from './views/Edit';

import { VIEWS } from './constants';
import {
  ModeContext,
  ModeContextDispatch,
  modeReducer,
} from './context/ModeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App = () => {
  const [mode, dispatch] = useReducer(modeReducer, VIEWS.main);
  // const mode = useContext(ModeContext);
  // const [mode, setMode] = useState(VIEWS.main);

  const SelectedView = mode === VIEWS.main ? MainView : EditView;

  return (
    <ModeContext.Provider>
      <ModeContextDispatch.Provider>
        <View style={styles.container}>
          <StatusBar style='auto' />
          <TopBar />
          <SelectedView />
        </View>
      </ModeContextDispatch.Provider>
    </ModeContext.Provider>
  );
};
