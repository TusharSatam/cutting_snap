import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calculator from './Pages/Calculator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <ScrollView style={styles.appContainer}>
      <View
        style={{zIndex: 10000, position: 'absolute', left: 0, width: '100%'}}>
        <Toast />
      </View>
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
    position: 'relative',
    fontFamily: 'Laila-Regular',
  },
});
