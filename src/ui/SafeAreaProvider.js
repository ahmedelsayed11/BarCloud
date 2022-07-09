import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import SafeArea from 'react-native-safe-area';

import {ActualHEIGHT} from '.';

const SafeAreaProvider = props => {
  const {
    children,
    style,
    noNotchAvoidance,
    screenBackground,
    barStyle,
    statusBarBackground,
    type,
  } = props;

  const [notch, setNotch] = useState(0);

  let HEIGHT = ActualHEIGHT();

  useEffect(() => {
    getNotch();
  }, []);

  const getNotch = async () => {
    await SafeArea.getSafeAreaInsetsForRootView().then(res => {
      setNotch(res.safeAreaInsets.top || 0);
    });
  };

  return (
    <>
      <View style={styles.statusBarForIos(notch, statusBarBackground)} />

      <View
        style={[
          styles.container(
            noNotchAvoidance,
            notch,
            screenBackground,
            statusBarBackground,
            type,
          ),
          style,
        ]}>
        <StatusBar
          hidden={false}
          backgroundColor={statusBarBackground || screenBackground}
          barStyle={barStyle || 'dark-content'}
        />

        <View
          style={[styles.safeAreaContainer(HEIGHT, screenBackground), style]}>
          {children}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: (
    noNotchAvoidance,
    notch,
    screenBackground,
    statusBarBackground,
    type,
  ) => ({
    // paddingTop: notch || 0,
    backgroundColor: screenBackground || statusBarBackground,
    width: '100%',
    height: type === 'MAP' ? ActualHEIGHT() : '100%',
  }),
  statusBarForIos: (notch, statusBarBackground) => ({
    width: '100%',
    height: notch || 0,
    backgroundColor: statusBarBackground,
  }),
  safeAreaContainer: (HEIGHT, screenBackground) => ({
    width: '100%',
    height: '100%',
    backgroundColor: screenBackground,
  }),
});
export default SafeAreaProvider;
