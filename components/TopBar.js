import React, { StyleSheet, Pressable, Text, View } from 'react-native';
import Button from './Button';

import { COLORS, VIEWS } from '../utils/constants';

import { MODE_ACTIONS, useMode, useModeDispatch } from '../context/mode';
import { RemindersContext } from '../context/ReminderContext';
import { useEffect, useContext } from 'react';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    color: COLORS.white,
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
  const [_, reminderActions] = useContext(RemindersContext);

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
    </>
  );
};

export default TopBar;
