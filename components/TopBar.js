import React, { StyleSheet, Pressable, Text, View } from 'react-native';
import Button from './Button';

import { COLORS, VIEWS } from '../constants';

import Time from '../components/Time';
import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';
import { useEffect, useContext } from 'react';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    height: 100,
  },
  title: {
    color: COLORS.white,
    fontFamily: 'Baskerville',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  mode: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.pink,
  },
});

const TopBar = () => {
  const mode = useMode();
  const dispatch = useModeDispatch();
  const [reminderState, reminderActions] = useContext(RemindersContext);

  useEffect(() => {
    reminderActions.getAllReminders();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>✿ Flowerly</Text>
        {mode === VIEWS.main && (
          <Button
            onPress={() => {
              dispatch(MODE_ACTIONS.create);
            }}
            title='Add'
          />
        )}
      </View>
      {/* <View style={styles.mode}>
        <Text>MODE: {mode}</Text>
      </View> */}
    </>
  );
};

export default TopBar;
