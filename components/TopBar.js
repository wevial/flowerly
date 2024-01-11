import React, { StyleSheet, Button, Text, View } from 'react-native';
import { VIEWS } from '../constants';
import Time from '../components/Time';
import ModeContext from '../context/ModeContext';
import { useContext } from 'react';

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

const TopBar = ({ mode, setMode }) => {
  console.log('mode', mode);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flowerly</Text>
      <Time />
      {mode === VIEWS.main && (
        <Button
          onPress={() => setMode(VIEWS.create)}
          title='Add Reminder'
        />
      )}
    </View>
  );
};

export default TopBar;
