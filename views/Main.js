import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { RemindersContext } from '../context/ReminderContext';
import Reminder from '../components/Reminder';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});

const Main = () => {
  const [reminderState, _] = useContext(RemindersContext);

  const reminders =
    reminderState?.reminders && typeof reminderState.reminders === 'object'
      ? reminderState.reminders
      : {};

  const reminderComponents = Object.keys(reminders).map((reminderId, idx) => {
    return (
      <Reminder
        key={reminderId}
        idx={idx}
        reminder={reminders[reminderId]}
      />
    );
  });

  return <View style={styles.container}>{reminderComponents}</View>;
};

export default Main;
