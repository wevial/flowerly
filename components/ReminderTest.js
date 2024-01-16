import { useContext, useEffect } from 'react';
import React, { StyleSheet, Text, View } from 'react-native';
import { RemindersContext } from '../context/ReminderContext';
import { initialState } from '../context/ReminderContext/reducer';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const ReminderTest = () => {
  const [reminderState, actions] = useContext(RemindersContext);
  useEffect(() => {
    actions.getReminder();
    console.log('got reminder useeffect!!');
  }, []);

  console.log('state', reminderState);
  return (
    <View style={styles.container}>
      <Text>Temporary reminder test</Text>
      <Text>{reminderState ? JSON.stringify(reminderState) : 'no state'}</Text>
    </View>
  );
};

export default ReminderTest;
