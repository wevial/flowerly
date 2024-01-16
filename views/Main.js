import { Text, View } from 'react-native';
import { RemindersContext } from '../context/ReminderContext';
import Reminder from '../components/Reminder';
import React, { useContext, useEffect } from 'react';

const Main = () => {
  const [reminderState, reminderActions] = useContext(RemindersContext);

  useEffect(() => {
    reminderActions.getAllReminders();
  }, []);

  const reminders = (reminderState.reminders || []).map((reminder) => (
    <Reminder
      key={reminder.id}
      {...reminder}
    />
  ));

  return <View>{reminders}</View>;
};

export default Main;
