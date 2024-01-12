import { Text, View } from 'react-native';
import Reminder from '../components/Reminder';

const Main = () => {
  return (
    <View>
      <Reminder />
      <Reminder />
      <Reminder />
      <Text>MainView</Text>
    </View>
  );
};

export default Main;
