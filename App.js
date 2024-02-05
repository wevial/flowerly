import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false); // maybe set to null
  const notificationListener = useRef();
  const responseListener = useRef();

  // Set up push notifications
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

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>
                Title: {notification && notification.request.content.title}{' '}
              </Text>
              <Text>
                Body: {notification && notification.request.content.body}
              </Text>
              <Text>
                Data:{' '}
                {notification &&
                  JSON.stringify(notification.request.content.data)}
              </Text>
            </View>
            <Button
              title='Press to schedule a notification'
              onPress={async () => {
                await schedulePushNotification();
              }}
            />
          </View>

          <SelectedView />
        </View>
      </RemindersProvider>
    </ModeProvider>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: 'your-project-id',
      })
    ).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
