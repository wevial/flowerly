import React, { StyleSheet, Button, Text, View } from 'react-native';

import { VIEWS } from '../constants';

import Time from '../components/Time';
import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';

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
  mode: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});

const TopBar = () => {
  const mode = useMode();
  const dispatch = useModeDispatch();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Flowerly</Text>
        <Text style={styles.title}>{mode}</Text>
        <Time />
        {mode === VIEWS.main && (
          <Button
            onPress={() => {
              dispatch(MODE_ACTIONS.create);
            }}
            title='Add'
          />
        )}
      </View>
      <View style={styles.mode}>
        <Text>MODE: {mode}</Text>
      </View>
    </>
  );
};

export default TopBar;
