import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { ModeProvider } from './context/mode';
import RemindersProvider from './context/ReminderContext/index';

import { LinearGradient } from 'expo-linear-gradient';

import TopBar from './components/TopBar';
import SelectedView from './views';
import { COLORS } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.peach,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default App = () => {
  return (
    <ModeProvider>
      <RemindersProvider>
        <View style={styles.container}>
          <LinearGradient
            style={styles.background}
            colors={[COLORS.violet, COLORS.purple, COLORS.pink]}
            locations={[0.2, 0.6, 1]}
          />
          <StatusBar style='auto' />
          <TopBar />
          <SelectedView />
        </View>
      </RemindersProvider>
    </ModeProvider>
  );
};
