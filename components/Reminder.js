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

const Reminder = () => {
  const mode = useMode();
  const dispatch = useModeDispatch();

  return (
    <View style={styles.container}>
      <Text>Water your plants</Text>
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
