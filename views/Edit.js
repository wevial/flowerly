import { Text, View } from 'react-native';
import Reminder from '../components/Reminder';
import { useMode } from '../context/ModeContext';

const Edit = () => {
  const mode = useMode();
  return (
    <View>
      <Text>{mode}</Text>
      <Reminder />
      <Reminder />
      <Reminder />
      <Text>EditView</Text>
    </View>
  );
};

export default Edit;
