import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Navigation from './src/navigation';

const App = () => {
  return <Navigation />;
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;
