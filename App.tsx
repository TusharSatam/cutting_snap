import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calculator from './Pages/Calculator';

const App = () => {
  return (
    <ScrollView style={styles.appContainer}>
      <Calculator />
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    height: '100%',
    color: 'black',
    fontFamily:"Times New Roman"
  },
});
