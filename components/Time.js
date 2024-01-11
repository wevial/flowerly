import React, { Text } from "react-native";

const Time = ({ current = true, timeProp }) => {
  const time = current ? new Date() : timeProp;
  return <Text>{time.toLocaleDateString()}</Text>;
};

export default Time;
