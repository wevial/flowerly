import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from './hooks/notificationFunctions';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // maybe set to false
    shouldSetBadge: false, // maybe set to true
  }),
});

export default App = () => {
  // Required for push notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false); // maybe set to null
  const notificationListener = useRef();
  const responseListener = useRef();

  // Set up/tear down push notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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
