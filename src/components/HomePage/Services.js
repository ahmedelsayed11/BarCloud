import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AssetInventroy from '../../assets/assetInventroy.svg';
import VendorsIconGrey from '../../assets/vendorsIconGray.svg';
import ServiceItem from './ServiceItem';

const Services = () => {
  const navigation = useNavigation();

  const navigateToServiceDetails = () => {
    navigation.navigate('ServiceDetails');
  };

  return (
    <View style={styles.container}>
      <ServiceItem title="Asset Inventroy" RightImage={AssetInventroy} />
      <ServiceItem
        title="Model"
        RightImage={VendorsIconGrey}
        onPress={navigateToServiceDetails}
      />
      <ServiceItem title="Person" RightImage={VendorsIconGrey} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {width: '100%', marginTop: 40},
});
export default Services;
