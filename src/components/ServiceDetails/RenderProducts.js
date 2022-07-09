import React, {useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../ui/Colors';
const RenderProducts = props => {
  const {
    models,
    filteredModels,
    debouncedSearchTerm,
    navigateToProductDetails,
  } = props;

  const _renderProducts = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToProductDetails(item)}
        style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: item.image_url}} style={styles.imageStyle} />
          </View>
          <View>
            <Text style={styles.productTextStyle}>{item.model_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const ItemSeparatorComponent = () => {
    return <View style={styles.itemSeperator} />;
  };
  return filteredModels?.length > 0 && debouncedSearchTerm != '' ? (
    <FlatList
      data={filteredModels}
      renderItem={_renderProducts}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.contentContainerStyle}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  ) : filteredModels?.length === 0 && debouncedSearchTerm != '' ? (
    <View style={styles.noDateContainer}>
      <Text>There is no matched models !</Text>
    </View>
  ) : (
    <FlatList
      data={models}
      renderItem={_renderProducts}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.contentContainerStyle}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};
const styles = StyleSheet.create({
  contentContainerStyle: {
    marginTop: 30,
    width: '90%',
    marginHorizontal: '5%',
  },
  container: {
    width: '50%',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  subContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors().White,
    borderRadius: 15,
    marginBottom: 5,
  },
  imageStyle: {
    width: 75,
    height: 75,
  },
  itemSeperator: {
    width: '90%',
    marginHorizontal: '5%',
    height: 2,
    backgroundColor: '#dedede',
    marginTop: 20,
    marginBottom: 20,
  },
  productTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },
  noDateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
  },
});
export default RenderProducts;
