import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import {useNavigation} from '@react-navigation/native';

import {Header, SafeAreaProvider} from '../ui';
import {Colors} from '../ui/Colors';
import {SearchBar, RenderProducts} from '../components';

const successcb = () => {
  console.log('Connected to DB........');
};
const errorcb = error => {
  console.log('🚀 ~ file: ServiceDetails.js ~ line 12 ~ error', error);
};

const db = SQLite.openDatabase(
  'bar_cloud.db',
  '1.0',
  'Test Database',
  200000,
  successcb,
  errorcb,
);

const ServiceDetails = () => {
  const navigation = useNavigation();

  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchText, setSearchText] = useState('');

  const debouncedSearchTerm = useDebounce(searchText, 500);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Models',
        [],
        (tx, results) => {
          let data = results.rows.length;

          var temp = [];
          for (let i = 0; i < data; ++i) {
            temp.push(results.rows.item(i));
          }

          setModels(temp);
        },
        error => {
          console.log(
            '🚀 ~ file: ServiceDetails.js ~ line 46 ~ tx.executeSql ~ error',
            error,
          );
        },
      );
    });
  }, []);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchModels(debouncedSearchTerm);
      } else {
        setFilteredModels([]);
      }
    },
    [debouncedSearchTerm, searchModels], // Only call effect if debounced search term changes
  );

  const onChangeSearchValue = value => {
    setSearchText(value);
  };

  const searchModels = useCallback(searchValueDebounced => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Models WHERE Models.model_name LIKE ?',
        [`%${searchValueDebounced}%`],
        (tx, results) => {
          let tempFilteredModels = [];
          let data = results.rows.length;
          for (let i = 0; i < data; i++) {
            tempFilteredModels.push(results.rows.item(i));
          }

          console.log(
            '🚀 ~ file: ServiceDetails.js ~ line 65 ~ ServiceDetails ~ tempFilteredModels',
            tempFilteredModels,
          );

          setFilteredModels(tempFilteredModels);
        },
        error => {},
      );
    });
  }, []);

  const navigateToProductDetails = item => {
    navigation.navigate('ProductDetails', {
      productId: item.model_id,
    });
  };

  return (
    <SafeAreaProvider
      statusBarBackground={Colors().HeaderBackground}
      screenBackground={'#f4f4f4'}>
      <Header title="Model" type="DETAILS" />

      <SearchBar
        onChangeSearchValue={onChangeSearchValue}
        searchText={searchText}
      />

      <RenderProducts
        models={models}
        filteredModels={filteredModels}
        debouncedSearchTerm={debouncedSearchTerm}
        navigateToProductDetails={navigateToProductDetails}
      />
    </SafeAreaProvider>
  );
};

const useDebounce = (value, delay) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setSearchValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return searchValue;
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default ServiceDetails;
