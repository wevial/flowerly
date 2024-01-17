import { Text, View } from 'react-native';
import { RemindersContext } from '../context/ReminderContext';
import Reminder from '../components/Reminder';
import React, { useContext, useEffect } from 'react';

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

  const reminderComponents = Object.keys(reminders).map((reminderId) => {
    return (
      <Reminder
        key={reminderId}
        {...reminders[reminderId]}
      />
    );
  });

  return <View>{reminderComponents}</View>;
};

export default Main;
