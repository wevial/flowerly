import { Text, View } from 'react-native';
import Reminder from '../components/Reminder';

const Main = ({ mode, setMode }) => {
  return (
    <View>
      <Reminder
        mode={mode}
        setMode={setMode}
      />
      <Reminder
        mode={mode}
        setMode={setMode}
      />
      <Reminder
        mode={mode}
        setMode={setMode}
      />
    </View>
  );
};

export default Main;
