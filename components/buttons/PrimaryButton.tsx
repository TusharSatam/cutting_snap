import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PrimaryButtonProps {
  text: string;
  action: () => void;
  style?: object;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, action, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={action}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Laila-Regular'
  },
});

export default PrimaryButton;
