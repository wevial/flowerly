import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: COLORS.pink,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: 'lowercase',
    // fontWeight: 'bold',
  },
});

const Button = ({ onPress, title, children }) => (
  <Pressable
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
    {children}
  </Pressable>
);

export default Button;
