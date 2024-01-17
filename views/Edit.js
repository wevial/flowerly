import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { useMode, useModeDispatch, MODE_ACTIONS } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';
import { VIEWS } from '../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  input: {
    backgroundColor: '#eee',
    borderWidth: 1,
    height: 40,
    margin: 10,
    padding: 10,
    width: '80%',
  },
});

const Edit = () => {
  const mode = useMode();
  const modeDispatch = useModeDispatch();
  // TODO: Update modes to be consistent with VIEWS
  const isCreationMode = mode === VIEWS.create;

  const [reminderState, reminderActions] = useContext(RemindersContext);
  const { selectedReminder } = reminderState;

  const [label, updateLabel] = useState(
    isCreationMode ? '' : selectedReminder.label || ''
  );
  const [time, updateTime] = useState(
    isCreationMode ? '1' : selectedReminder.time || '1'
  );

  return (
    <View style={styles.container}>
      <Text>What would you like to be reminded of?</Text>
      <TextInput
        style={styles.input}
        placeholder='Water my Monstera deliciosa'
        value={label}
        onChangeText={updateLabel}
      />
      <Text>How often would you like to be reminded (in days)?</Text>
      <TextInput
        style={styles.input}
        placeholder='3'
        keyboardType='numeric'
        value={time}
        onChangeText={updateTime}
      />
      <Button
        onPress={() => {
          if (!label || !time) return;
          // TODO: add validation in UI
          const reminder = {
            label,
            time,
          };
          if (!isCreationMode) {
            reminder.id = selectedReminder.id;
          }
          reminderActions.updateReminder(reminder);
          modeDispatch(MODE_ACTIONS.main);
        }}
        title={isCreationMode ? 'Create' : 'Save'}
      />
      {!isCreationMode && (
        <Button
          onPress={() => {
            reminderActions.deleteReminder(selectedReminder.id);
            modeDispatch(MODE_ACTIONS.main);
          }}
          title='Delete'
        />
      )}
      <Button
        onPress={() => {
          !isCreationMode && reminderActions.resetSelectedReminder();
          modeDispatch(MODE_ACTIONS.main);
        }}
        title='Cancel'
      />
    </View>
  );
};

export default Edit;
