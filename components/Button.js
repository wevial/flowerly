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
    borderWidth: 1,
    borderColor: COLORS.pink,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: 'lowercase',
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    elevation: 3,
    borderColor: COLORS.pink,
    borderWidth: 1,
  },
  disabledText: {
    color: COLORS.pink,
    fontSize: 16,
    textTransform: 'lowercase',
  },
  warningButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: COLORS.lilac,
    borderWidth: 1,
    borderColor: COLORS.lilac,
  },
  warningText: {
    color: COLORS.white,
    fontSize: 16,
    textTransform: 'lowercase',
  },
});

const Button = ({ onPress, title, warning = false, ...props }) => {
  const disabled = props.disabled || false;
  const buttonStyle = disabled
    ? styles.disabledButton
    : warning
    ? styles.warningButton
    : styles.button;
  const textStyle = disabled
    ? styles.disabledText
    : warning
    ? styles.warningText
    : styles.text;

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      {...props}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default Button;
