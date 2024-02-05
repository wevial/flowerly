import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';
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

const timeUntilNextBloom = (time, lastNotificationAt) => {
  const timeNum = parseInt(time);
  const timeSinceLastNotification = differenceInDays(
    new Date(),
    new Date(lastNotificationAt)
  );

  const emoji = getBloomEmoji(time, lastNotificationAt);
  if (timeSinceLastNotification >= timeNum) {
    return `blooming now! ${emoji}`;
  }
  const difference = timeNum - timeSinceLastNotification;
  const days =
    difference === 1
      ? 'tomorrow'
      : `in ${timeNum - timeSinceLastNotification} days`;
  return `next bloom ${days} ${emoji}`;
};

const getBloomEmoji = (time, lastNotificationAt) => {
  // using hours for more granularity
  const timeInHours = parseInt(time) * 24;
  const timeSinceLastNotification = differenceInHours(
    new Date(),
    new Date(lastNotificationAt)
  );

  const percentToNextNotification = timeSinceLastNotification / timeInHours;
  if (percentToNextNotification >= 1) {
    return '☀️';
  } else if (percentToNextNotification >= 0.75) {
    return '🌤';
  } else if (percentToNextNotification >= 0.5) {
    return '⛅️';
  } else if (percentToNextNotification >= 0.25) {
    return '🌥';
  }
  return '☁️';
};

const Reminder = ({ idx, reminder }) => {
  const { id, label, time, lastNotificationAt } = reminder;
  const dispatch = useModeDispatch();
  const [_, reminderActions] = useContext(RemindersContext);
  const bloomFrequency = time === '1' ? 'every day' : `every ${time} days`;
  const nextBloomDays = timeUntilNextBloom(time, lastNotificationAt);

  return (
    <>
      {idx === 0 && <Divider />}
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.frequency}>blooming {bloomFrequency} ✿</Text>
            <Text style={styles.nextReminder}>{nextBloomDays}</Text>
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
