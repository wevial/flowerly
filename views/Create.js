import { StyleSheet, Text, View } from 'react-native';
import Time from './components/Time';
import Reminder from './components/Reminder';

const Create = () => {
return (
    <View style={styles.container}>
      <Time />
      <Reminder />
    </View>
  );
};

export default Create;