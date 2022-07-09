import React, {useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Header, SafeAreaProvider} from '../ui';
import {Colors} from '../ui/Colors';
import {Services} from '../components';

import SQLite from 'react-native-sqlite-2';

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

const HomePage = () => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql('DROP TABLE IF EXISTS Models', []);

      txn.executeSql(
        'CREATE TABLE "Models" ("model_id"	TEXT,"model_code"	TEXT,"model_name"	TEXT,"model_type"	TEXT,"cost"	NUMERIC,"category"	TEXT, "description"	TEXT,"image_url"	TEXT,PRIMARY KEY("model_id"))',
        [],
      );

      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS "notes" ("note_id"	INTEGER, "note_by"	TEXT,"note_date"	TEXT,"note_details"	TEXT,"model_id"	TEXT,PRIMARY KEY("note_id"))',
        [],
      );

      txn.executeSql(
        `INSERT INTO "Models" (model_id, model_code , model_name, model_type,cost, category, description, image_url) VALUES ("GT200" , null , "Printer HS" , "Hello 3" , "100" , "Hardware" , "some description" , "https://www.picng.com/upload/printer/png_printer_72138.png"),
        ('GT300',
        null,
        'LCD XS',
        'Hello 2',
        '100',
        'Hardware',
        'some description',
        'https://media.istockphoto.com/photos/big-led-tv-isolated-on-white-background-picture-id1369163165?b=1&k=20&m=1369163165&s=170667a&w=0&h=T_fp1eHAGdNciOfa0cE5qV_hrTPbwQbaNYMS6qJNHw8='),
        ('GT400',
        'null',
        'Laptops',
        'Hello 3',
        '180',
        'Hardware',
        'some description',
        'https://mashtrelo.com/wp-content/uploads/2017/11/laptop-notebook-png-image-image-with-transparent-background.png'),
        ('GT500',
        null,
        'Printer Inc',
        'Hello 4',
        '200',
        'Hardware',
        'some description',
        'https://5.imimg.com/data5/KM/KO/YC/SELLER-4546451/splashjet-refill-ink-for-epson-t60-tx720-1390-printer-500x500.jpg')`,
        [],
      );
    });
  }, []);

  return (
    <SafeAreaProvider
      statusBarBackground={Colors().HeaderBackground}
      screenBackground={Colors().White}
      style={styles.safeAreView}>
      <Header title="Picture" rightTitle="Processes" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Services />
      </ScrollView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  safeAreView: {flex: 1},
});
export default HomePage;
