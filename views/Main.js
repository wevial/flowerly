import { Text, View, StyleSheet } from 'react-native';
import { RemindersContext } from '../context/ReminderContext';
import Reminder from '../components/Reminder';
import React, { useContext, useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
});

const Main = () => {
  const [reminderState, reminderActions] = useContext(RemindersContext);

  useEffect(() => {
    reminderActions.getAllReminders();
  }, []);

  const reminders =
    reminderState &&
    reminderState.reminders &&
    typeof reminderState.reminders === 'object'
      ? reminderState.reminders
      : {};
  // const reminders = reminderState?.reminders || {};

  const reminderComponents = Object.keys(reminders).map((reminderId, idx) => {
    return (
      <Reminder
        key={reminderId}
        idx={idx}
        {...reminders[reminderId]}
      />
    );
  });

  return <View style={styles.container}>{reminderComponents}</View>;
};

export default Main;
