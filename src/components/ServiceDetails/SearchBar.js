import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../ui/Colors';
import BarCode from '../../assets/barCode.svg';

const SearchBar = props => {
  const {onChangeSearchValue, searchText} = props;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Type to Search"
            style={styles.textInput}
            placeholderTextColor={Colors().searchBarTextColor}
            onChangeText={onChangeSearchValue}
            value={searchText}
          />
        </View>
        <View style={styles.barCodeContainer}>
          <BarCode />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 30,
    marginHorizontal: '5%',
    height: 55,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: Colors().White,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowColor: '#171717',
    // elevation: 1,
  },
  subContainer: {
    width: '90%',
    marginHorizontal: '5%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInputContainer: {
    width: '90%',
    justifyContent: 'center',
    height: '100%',
  },
  barCodeContainer: {
    width: '10%',
  },
  textInput: {
    color: Colors().searchBarTextColor,
    fontSize: 17,
  },
});
export default SearchBar;
