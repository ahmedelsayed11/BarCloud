import {Dimensions, StatusBar} from 'react-native';
import Header from './Header';
import SafeAreaProvider from './SafeAreaProvider';

let ActualHEIGHT = () => {
  return Dimensions.get('window').height - (StatusBar.currentHeight || 0);
};

export {Header, ActualHEIGHT, SafeAreaProvider};
