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

const Create = () => {
  const mode = useMode();
  const modeDispatch = useModeDispatch();
  const [reminderState, reminderActions] = useContext(RemindersContext);
  const [label, updateLabel] = useState('');
  const [time, updateTime] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Reminder Label'
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
          console.log('creating new reminder', label, time);
          if (!label || !time) return;
          reminderActions.createReminder({ label, time });
          modeDispatch(MODE_ACTIONS.main);
        }}
        title='Create'
      />
      <Button
        onPress={() => {
          modeDispatch(MODE_ACTIONS.main);
        }}
        title='Cancel'
      />
    </View>
  );
};

export default Create;
