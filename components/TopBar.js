import React, { StyleSheet, Button, Text, View } from 'react-native';

import { VIEWS } from '../constants';

import Time from '../components/Time';
import { modeActions, useMode, useModeDispatch } from '../context/ModeContext';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ccc',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: { color: '#111' },
});

const TopBar = () => {
  const mode = useMode();
  const dispatch = useModeDispatch();
  console.log('mode', mode);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flowerly</Text>
      <Time />
      {mode === VIEWS.main && (
        <Button
          onPress={() => {
            dispatch(modeActions.create);
          }}
          title='Add Reminder'
        />
      )}
    </View>
  );
};

export default TopBar;
