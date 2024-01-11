import { Text, View } from "react-native";
import Reminder from "../components/Reminder";

const Edit = ({ mode, setMode }) => {
  return (
    <View>
      <Text>{mode}</Text>
      <Reminder mode={mode} setMode={setMode}/>
      <Reminder mode={mode} setMode={setMode}/>
      <Reminder mode={mode} setMode={setMode}/>
    </View>
  );
};

export default Edit;
