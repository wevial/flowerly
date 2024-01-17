import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { useMode, useModeDispatch, MODE_ACTIONS } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const Edit = () => {
  const mode = useMode();
  const modeDispatch = useModeDispatch();
  const [reminderState, reminderActions] = useContext(RemindersContext);
  const { selectedReminder } = reminderState;

  const [label, updateLabel] = useState(selectedReminder.label || '');
  const [time, updateTime] = useState(selectedReminder.time || '');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Reminder Label'
        value={label}
        onChangeText={updateLabel}
      />
      <TextInput
        placeholder='Reminder Time'
        keyboardType='numeric'
        value={time}
        onChangeText={updateTime}
      />
      <Button
        onPress={() => {
          console.log('updating reminder', selectedReminder.id, label, time);
          if (!label || !time) return;
          reminderActions.updateReminder({
            id: selectedReminder.id,
            label,
            time,
          });
          modeDispatch(MODE_ACTIONS.main);
        }}
        title='Save'
      />
      <Button
        onPress={() => {
          reminderActions.resetSelectedReminder();
          modeDispatch(MODE_ACTIONS.main);
        }}
        title='Cancel'
      />
      <Button
        onPress={() => {
          reminderActions.deleteReminder(selectedReminder.id);
          modeDispatch(MODE_ACTIONS.main);
        }}
        title='Delete'
      />
    </View>
  );
};

export default Edit;
