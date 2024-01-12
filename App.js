import { StatusBar } from 'expo-status-bar';
import React, { useContext, useMemo, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TopBar from './components/TopBar';
import SelectedView from './views';
// import MainView from './views/Main';
// import EditView from './views/Edit';

import { VIEWS } from './constants';
import { ModeProvider, useMode } from './context/ModeContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App = () => {
  // Need to figure out how to use the context here to choose which view to display!!
  // const mode = useMode(); // might not be refreshing well due to provider level. might need to go one level higher.
  // console.log('MODE!!!', mode);
  // const SelectedView = mode === VIEWS.main ? MainView : EditView;

  return (
    <ModeProvider>
      <View style={styles.container}>
        {/* <Text>MODE: {mode}</Text> */}
        <StatusBar style='auto' />
        <TopBar />
        <SelectedView />
        <Text>BLERGHY!!</Text>
      </View>
    </ModeProvider>
  );
};
