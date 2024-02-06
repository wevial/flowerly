import { StyleSheet, TextInput, View, Text } from 'react-native';
import React, { useContext, useState } from 'react';

import { useMode, useModeDispatch, MODE_ACTIONS } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';
import { VIEWS } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const Edit = () => {
  const mode = useMode();
  const modeDispatch = useModeDispatch();
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
      <Input
        label='What would you like to be reminded of?'
        placeholder='Water my Monstera deliciosa'
        value={label}
        onChangeText={updateLabel}
      />
      <Input
        label='How often would you like to be reminded (in days)?'
        placeholder='3'
        keyboardType='numeric'
        value={time}
        onChangeText={updateTime}
      />
      <View style={styles.buttonContainer}>
        <Button
          disabled={!label || !time}
          onPress={() => {
            const reminder = isCreationMode
              ? {
                  label,
                  time,
                }
              : { ...selectedReminder, label, time };
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
            warning
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
    </View>
  );
};

export default Edit;
