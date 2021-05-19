import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {urlDate2} from '../scripts/dataTime';
import axios from 'axios';
import urlDate from '../scripts/dataTime';
import {t} from 'react-native-tailwindcss';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {getRequest, postRequest} from '../actions/index';
import 'moment/locale/ru';
const styles = StyleSheet.create({
  tinyLogo: {
    height: 27,
    width: 157,
    justifyContent: 'center',
    marginTop: 52,
  },
  login: {
    backgroundColor: '#2323C8',
    width: 280,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Golos-text_Regular',
  },
  inputContainer: {
    marginTop: 5,

    justifyContent: 'center',
    width: 280,
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 'auto',

    marginTop: 25,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AddContract = ({route, navigation}) => {
  const {userId, password, contractorsId, brendId} = route.params;
  const [ID, setSelectedValue] = useState('');
  const [SettlementsType, setPickerValue] = useState('');
  const [typeData, setTypeData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [load, setload] = useState(false);
  const locale = 'ru';
  useEffect(() => {
    async function _getData() {
      await getRequest('settlementstypes', userId, password)
      .then(res =>{
        if(res.status === 200) {
          setTypeData(res.data.types)
        } else {
          Alert.alert(res.data)
        }
      })
    }
    _getData();
  }, []);

  const sendContract = () => {
    const body = {
      ID,
      date: `${date.getFullYear()}${
        (date.getUTCMonth() < 9 ? '0' : '') + (date.getUTCMonth() + 1)
      }${(date.getDate() < 9 ? '0' : '') + (date.getDate() + 1)}`,
      SettlementsType,
    };
    console.log(body, '11111111111111111111111111111111');
    setload(true);

    const path = `contracts/${contractorsId}/${brendId}/00010101`;
    postRequest(path, body, userId, password)
      .then((res) => {
        console.log(res, '00000000000000000000000000');
        if (res.UIDContract) {
          navigation.navigate('Home', {
            UIDContract: res.UIDContract,
            created: true,
          });
          setload(false);
        }
      })

      .catch((e) => {
        console.log(e);
        setload(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        t.absolute,
        t.inset0,
        t.p4,
        {flex: 1, backgroundColor: '#E5E5E5'},
      ]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            padding: 24,
            justifyContent: 'space-around',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {SettlementsType !== 'Наличные' ? (
            <>
              <TextInput
                style={styles.inputContainer}
                placeholder="номер договора..."
                onChangeText={(text) => setSelectedValue(text)}
                value={ID}
              />
              <View style={styles.inputContainer}>
                <Picker
                  style={styles.input}
                  placeholderTextColor="#666"
                  selectedValue={SettlementsType}
                  onValueChange={(val) => setPickerValue(val)}>
                  {typeData.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                  ))}
                </Picker>
              </View>
              <View style={{marginBottom: 70, marginTop: 20}}>
                <DatePicker
                  mode="date"
                  androidVariant="nativeAndroid"
                  locale={locale}
                  date={date}
                  onDateChange={(dte) => {
                    console.log(dte.getDate());
                    setDate(dte);
                  }}
                />
              </View>
            </>
          ) : (
            <View style={styles.inputContainer}>
              <Picker
                style={styles.input}
                placeholderTextColor="#666"
                selectedValue={SettlementsType}
                onValueChange={(val) => setPickerValue(val)}>
                {typeData.map((item) => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
            </View>
          )}
          <TouchableOpacity style={styles.login} onPress={sendContract}>
            <Text style={styles.textLogin}>
              {load ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                'создать договор'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddContract;
// let result = await fetch(`http://192.168.1.124/dms/hs/app/contracts/${contractorsId}/${brendId}/20210202`,{
//   method:'POST',
//   mode:'no-cors',
//   body: JSON.stringify({
//     ID: selectedValue,
//     Date: date,
//     SettlementsType: pickerValue,
//   })

// });
