import React, { useContext } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';

import { RemindersContext } from '../context/ReminderContext';
import Reminder from '../components/Reminder';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
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
      ? Object.values(reminderState.reminders)
      : [];

  return (
    <SafeAreaView style={styles.view}>
      <FlatList
        data={reminders}
        renderItem={({ item }) => <Reminder reminder={item} />}
        keyExtractor={(reminder) => reminder.id}
        extraData={reminderState}
      />
    </SafeAreaView>
  );
};

export default Main;
