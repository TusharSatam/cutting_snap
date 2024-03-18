import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface CustomButtonProps {
  text?: string;
  action?: () => void;
  style?: object;
  buttonstyle?: object;
  icon?: JSX.Element;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  action,
  style,
  buttonstyle,
  icon,
}) => {
  console.log(icon);
  
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={action}>
      {icon ? icon : <Text style={[styles.textstyle,buttonstyle]}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
    fontFamily: 'Laila-Regular'
  },
  textstyle:{
    fontFamily: 'Laila-Regular'
  }
});

export default CustomButton;
