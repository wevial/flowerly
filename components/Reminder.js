import React, { StyleSheet, Button, Text, View } from 'react-native';
import { VIEWS } from '../constants';
import { modeActions, useMode, useModeDispatch } from '../context/ModeContext';

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
          dispatch(modeActions.edit);
        }}
        title='Edit'
      />
    </View>
  );
};

export default Reminder;
