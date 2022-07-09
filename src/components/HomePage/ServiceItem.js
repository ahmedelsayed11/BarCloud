import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import ArrowRightGrey from '../../assets/arrowRightGray.svg';
import {Colors} from '../../ui/Colors';

const ServiceItem = props => {
  const {title, RightImage, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.subContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          <RightImage width={24} height={22} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleTextStyle}>{title}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <ArrowRightGrey width={19} height={12} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  subContainer: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: Colors().HeaderBackground,
    height: 55,
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconContainer: {
    marginLeft: 20,
  },
  titleContainer: {
    marginLeft: 10,
  },
  titleTextStyle: {
    fontSize: 18,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  rightContainer: {
    width: '15%',
    alignItems: 'flex-end',
  },
});
export default ServiceItem;
