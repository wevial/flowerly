import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { COLORS, VIEWS } from '../constants';
import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 10,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  label: {
    color: COLORS.white,
    fontSize: 20,
    width: '100%',
  },
  frequency: {
    color: COLORS.peach,
    fontSize: 12,
  },
  nextReminder: {
    color: COLORS.white,
    fontSize: 14,
  },
});

const Divider = () => (
  <View
    style={{
      borderBottomColor: COLORS.white,
      borderBottomWidth: 1,
      width: '100%',
    }}
  />
);

const Reminder = ({ id, label, time, idx }) => {
  const dispatch = useModeDispatch();
  const [_, reminderActions] = useContext(RemindersContext);
  const nextBloomDays = time === '1' ? 'day' : 'days';
  const bloomFrequency = time === '1' ? 'every day' : `every ${time} days`;

  return (
    <>
      {idx === 0 && <Divider />}
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.frequency}>blooming {bloomFrequency} ✿</Text>
            <Text style={styles.nextReminder}>
              next bloom in {time} {nextBloomDays} ☀️
            </Text>
          </View>
          <Button
            onPress={() => {
              reminderActions.selectReminder(id);
              dispatch(MODE_ACTIONS.edit);
            }}
            title='Edit'
          />
        </View>
      </View>
    </>
  );
};

export default Reminder;
