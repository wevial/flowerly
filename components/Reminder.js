import { StyleSheet, Button, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { VIEWS } from '../constants';
import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

const Reminder = ({ id, label, time }) => {
  const dispatch = useModeDispatch();
  const [reminderState, reminderActions] = useContext(RemindersContext);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text>{time}</Text>
      <Button
        onPress={() => {
          reminderActions.selectReminder(id);
          dispatch(MODE_ACTIONS.edit);
        }}
        title='Edit'
      />
    </View>
  );
};

export default Reminder;
