import React, { StyleSheet, Button, Text, View } from "react-native";
import { VIEWS } from "../constants";

const styles = StyleSheet.create({
    container: {
    width: '100%',
      flexDirection: "row",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-around",
    },
  });

const Reminder = ({ mode, setMode }) => (
  <View style={styles.container}>
    <Text>Water your plants</Text>
    <Text>Mode: {mode}</Text>
    <Button onPress={() => setMode(VIEWS.edit)} title="Edit" />
  </View>
);

export default Reminder;
