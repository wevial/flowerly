import React, { StyleSheet, Button, Text, View } from 'react-native';
import { VIEWS } from '../constants';
import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const Reminder = ({ label, time }) => {
  const mode = useMode();
  const dispatch = useModeDispatch();

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text>{time}</Text>
      <Text>Mode: {mode}</Text>
      <Button
        onPress={() => {
          dispatch(MODE_ACTIONS.edit);
        }}
        title='Edit'
      />
    </View>
  );
};

export default Reminder;
