import { StatusBar } from 'expo-status-bar';
import React, { useContext, useMemo, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ModeProvider } from './context/mode';
import RemindersProvider from './context/ReminderContext/index';

import TopBar from './components/TopBar';
import SelectedView from './views';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App = () => {
  return (
    <ModeProvider>
      <RemindersProvider>
        <View style={styles.container}>
          <StatusBar style='auto' />
          <TopBar />
          <SelectedView />
          <Text>BLERGHY!!</Text>
        </View>
      </RemindersProvider>
    </ModeProvider>
  );
};
