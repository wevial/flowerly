import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS, VIEWS } from '../constants';
import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    color: COLORS.white,
    fontSize: 20,
  },
});

const Reminder = ({ id, label, time, idx }) => {
  const dispatch = useModeDispatch();
  const [reminderState, reminderActions] = useContext(RemindersContext);

  return (
    <>
      {idx === 0 && (
        <View
          style={{
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            width: '100%',
          }}
        />
      )}
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.label}>{time}</Text>
        <Button
          onPress={() => {
            reminderActions.selectReminder(id);
            dispatch(MODE_ACTIONS.edit);
          }}
          title='Edit'
        />
      </View>
      <View
        style={{
          borderBottomColor: COLORS.white,
          borderBottomWidth: 1,
          width: '100%',
        }}
      />
    </>
  );
};

export default Reminder;
