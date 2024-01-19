import { StyleSheet, TextInput, View, Text } from 'react-native';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  label: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.violet,
    height: 40,
    margin: 10,
    padding: 10,
    width: '80%',
    marginBottom: 30,
    borderRadius: 10,
  },
});

const Input = ({ label, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default Input;
