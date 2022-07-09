import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-2';
import ArrowUp from '../assets/arrowUp.svg';
import SaveIcon from '../assets/SaveIcon.svg';

import {ActualHEIGHT, Header, SafeAreaProvider} from '../ui';
import {Colors} from '../ui/Colors';

import {formatDate} from '../utils/formatDate';

const successcb = () => {};
const errorcb = error => {};

const db = SQLite.openDatabase('bar_cloud.db', '1.0', '', 1);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ProductDetails = props => {
  const {productId} = props.route.params;

  const [productDetail, setProductDetail] = useState({});
  const [imageInfoCollapsed, setImageInfoCollapsed] = useState(false);
  const [notesCollapsed, setNotesCollapsed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteValue, setNoteValue] = useState('');
  const [saveDisables, setSaveDisabled] = useState(false);

  useEffect(() => {
    getProductDetails();
    getProductNotes();
  }, [getProductDetails, getProductNotes]);

  const getProductDetails = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Models where Models.model_id = ?',
        [productId],
        (tx, results) => {
          if (results.rows.length > 0) {
            setProductDetail(results.rows.item(0));
          } else {
            setProductDetail(null);
          }
        },
        error => {
          console.log(
            '🚀 ~ file: ProductDetails.js ~ line 64 ~ getProductDetails ~ error',
            error,
          );
        },
      );
    });
  }, [productId]);

  const getProductNotes = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM notes where notes.model_id = ?',
        [productId],
        (tx, results) => {
          if (results.rows.length > 0) {
            let tempNotes = [];
            for (let i = 0; i < results.rows.length; i++) {
              tempNotes.push(results.rows.item(i));
            }

            setNotes(tempNotes);
          } else {
            setNotes([]);
          }
        },
        error => {},
      );
    });
  }, [productId]);

  const addNewNote = useCallback(() => {
    let tempNoteValue = noteValue;
    if (tempNoteValue?.trim() === '') {
      Alert.alert('Please add note value');
      return;
    }

    //  03.02.2021-15:00PM This Item need to be checked

    setSaveDisabled(true);
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO notes(note_by,note_date,note_details,model_id) values(?,?,?,?)',
        ['Jennifer Smith', new Date().toString(), noteValue, productId],
        (tx, results) => {
          setSaveDisabled(false);
          setNoteValue('');
          if (results.rowsAffected > 0) {
            getProductNotes();
          }
        },
        error => {},
      );
    });
  }, [noteValue, productId, getProductNotes]);

  const rendernotes = useCallback(() => {
    if (notes?.length > 0) {
      return notes.map(item => {
        return (
          <View style={styles.noteItemContainer}>
            <View>
              <Text style={styles.noteByTextStyle}>{item.note_by}</Text>
            </View>
            <View>
              <Text style={styles.noteDateTextStyle}>
                {formatDate(item.note_date)}
              </Text>
            </View>
            <View>
              <Text style={styles.noteDetailsTextStyle}>
                {item.note_details}
              </Text>
            </View>
            <View
              style={[
                styles.seperator,
                {marginTop: 4, width: '100%', marginHorizontal: 0},
              ]}
            />
          </View>
        );
      });
    } else {
      return (
        <View style={styles.noNotesContainer}>
          <Text style={styles.noNotesTextStyle}>No Notes found</Text>
        </View>
      );
    }
  }, [notes]);

  return (
    <SafeAreaProvider
      statusBarBackground={Colors().HeaderBackground}
      screenBackground={'#eaeaea'}>
      <Header title="ModelDetails" type="MODEL_DETAILS" />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: productDetail?.image_url}}
              style={styles.image}
            />
          </View>

          <View style={styles.seperator} />

          <View style={styles.imageInfoContainer}>
            <View>
              <Text style={styles.iimageInfotext}>Image Info</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setImageInfoCollapsed(!imageInfoCollapsed);
              }}>
              <ArrowUp width={15} height={15} />
            </TouchableOpacity>
          </View>

          {imageInfoCollapsed ? (
            <View>
              <View style={styles.imageInfoItemContainer}>
                <View>
                  <Text style={styles.imageInfoLableStyle}>Model</Text>
                </View>
                <View>
                  <Text style={styles.imageInfoValueStyle}>
                    {productDetail?.model_id}
                  </Text>
                </View>
              </View>

              <View style={styles.imageInfoItemContainer}>
                <View>
                  <Text style={styles.imageInfoLableStyle}>Model Name</Text>
                </View>
                <View>
                  <Text style={styles.imageInfoValueStyle}>
                    {productDetail?.model_name}
                  </Text>
                </View>
              </View>
              <View style={styles.imageInfoItemContainer}>
                <View>
                  <Text style={styles.imageInfoLableStyle}>Model Type</Text>
                </View>
                <View>
                  <Text style={styles.imageInfoValueStyle}>
                    {productDetail?.model_type}
                  </Text>
                </View>
              </View>
              <View style={styles.imageInfoItemContainer}>
                <View>
                  <Text style={styles.imageInfoLableStyle}>Cost</Text>
                </View>
                <View>
                  <Text style={styles.imageInfoValueStyle}>
                    ${productDetail?.cost}
                  </Text>
                </View>
              </View>
              <View style={styles.imageInfoItemContainer}>
                <View>
                  <Text style={styles.imageInfoLableStyle}>Category</Text>
                </View>
                <View>
                  <Text style={styles.imageInfoValueStyle}>
                    {productDetail?.category}
                  </Text>
                </View>
              </View>
              <View style={styles.imageInfoItemContainer}>
                <View>
                  <Text style={styles.imageInfoLableStyle}>
                    Additional Description
                  </Text>
                </View>
                <View>
                  <Text style={styles.imageInfoValueStyle}>
                    {productDetail?.description}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View style={styles.imageInfoContainer}>
            <View>
              <Text style={styles.iimageInfotext}>Notes</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setNotesCollapsed(!notesCollapsed);
              }}>
              <ArrowUp width={15} height={15} />
            </TouchableOpacity>
          </View>

          {notesCollapsed ? (
            <View>
              <TouchableOpacity
                onPress={addNewNote}
                style={styles.saveIconContainer}>
                <SaveIcon style={styles.saveIcon} />
                <Text>Save</Text>
              </TouchableOpacity>
              <View style={styles.inputStyleContainer}>
                <TextInput
                  placeholder="Add a Note....."
                  style={styles.inputStyle}
                  placeholderTextColor="#c4c4c4"
                  value={noteValue}
                  onChangeText={value => {
                    setNoteValue(value);
                  }}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.notesContainer}>
            <View>
              <Text style={styles.headerNoteStyle}>History Notes</Text>
            </View>
          </View>
          <View style={styles.renderNotesContainer}>{rendernotes()}</View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
    height: '80%',
    backgroundColor: Colors().HeaderBackground,
    marginTop: 20,
    borderRadius: 20,
  },
  imageContainer: {
    width: '60%',
    marginHorizontal: '20%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors().White,
    marginTop: 20,
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  seperator: {
    width: '90%',
    marginHorizontal: '5%',
    height: 2,
    backgroundColor: '#dedede',
    marginTop: 25,
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
  },
  imageInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 20,
    alignItems: 'center',
  },
  iimageInfotext: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageInfoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 15,
  },
  imageInfoLableStyle: {
    fontWeight: '200',
    fontSize: 16,
  },
  imageInfoValueStyle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  saveIconContainer: {
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  saveIcon: {
    marginHorizontal: 10,
  },
  inputStyleContainer: {
    width: '90%',
    marginHorizontal: '5%',
    height: 54,
    justifyContent: 'center',
    backgroundColor: Colors().White,
    borderRadius: 50,
    marginTop: 15,
  },
  inputStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '400',
    fontSize: 15,
    color: '#c4c4c4',
  },
  notesContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 20,
  },
  headerNoteStyle: {
    fontWeight: '200',
    fontSize: 17,
  },
  renderNotesContainer: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: Colors().White,
    borderRadius: 15,
    marginTop: 10,
    paddingVertical: 20,
  },
  noNotesContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  noNotesTextStyle: {
    fontWeight: '200',
    fontSize: 16,
  },
  noteItemContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  noteByTextStyle: {
    fontWeight: '600',
    fontSize: 15,
  },
  noteDateTextStyle: {
    fontWeight: '200',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
  },
  noteDetailsTextStyle: {
    fontSize: 16,
    fontWeight: '200',
    marginBottom: 5,
  },
});
export default ProductDetails;
