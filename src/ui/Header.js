import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ProccessIcon from '../assets/processIcon.svg';
import ArrowBackHeader from '../assets/arrowBackHeader.svg';
import EditIcon from '../assets/edit-icon.svg';
import {Colors} from './Colors';

const Header = props => {
  const {title, rightTitle, type} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.leftHeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.leftBackIconContainer}>
            <ArrowBackHeader />
            <Text style={styles.backTextStyle}>Back</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleTextStyle}>{title}</Text>
          </View>
        </View>
        <View style={styles.rightHeaderContainer}>
          {type === 'DETAILS' ? null : type === 'MODEL_DETAILS' ? (
            <TouchableOpacity style={styles.editButtonContainer}>
              <EditIcon style={styles.editIconStyle} />
              <Text>Edit</Text>
            </TouchableOpacity>
          ) : (
            <>
              <ProccessIcon width={30} height={30} />
              <Text style={[styles.backTextStyle, {marginTop: 0}]}>
                {rightTitle}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#DEDEDE',
  },
  subContainer: {
    width: '90%',
    marginHorizontal: '5%',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  rightHeaderContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBackIconContainer: {
    alignItems: 'center',
  },
  backIconStyle: {
    width: 40,
    height: 40,
  },
  backTextStyle: {
    fontSize: 8,
    color: '#4E4E4E',
    marginTop: -7,
    fontWeight: 'bold',
  },

  titleContainer: {
    marginHorizontal: 10,
  },
  titleTextStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4E4E4E',
  },
  proccessImage: {width: 30, height: 30},
  editButtonContainer: {
    flexDirection: 'row',
    width: 80,
    height: 35,
    backgroundColor: Colors().White,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  editIconStyle: {
    marginHorizontal: 4,
  },
});

export default Header;
