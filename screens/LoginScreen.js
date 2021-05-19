import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {t} from 'react-native-tailwindcss';
import InputForm from '../components/InputForm';
import InputPassword from '../components/InputPassword';
import {getRequest} from '../actions/index';
import {St} from '../App';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
    fontFamily: 'Golos-text_Regular',
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

const LoginScreen = ({navigation}) => {
  const [filial, setFilial] = useState([]); //test emas
  const Storage = React.useContext(St);
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [storage, setStorage] = useState();
  const [userId, setUserId] = useState();
  const [filialId, setFilialId] = useState('');
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [auth, setAuth] = useState('');
  const [shoykeyb, setShowkeyb] = useState(false);

  // if (!global.btoa) {
  //     global.btoa = encode;
  // }

  // if (!global.atob) {
  //     global.atob = decode;
  // }
  const SaveLogin = () => {
    AsyncStorage.setItem(
      'saveuser',
      JSON.stringify({
        select1: selectedValue,
        select2: selectedValue2,
        password,
      }),
    );
  };

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      setShowkeyb(true);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setShowkeyb(false);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    setLoad2(true);
    async function _getData() {
      const _filial = await getRequest('branches');
      AsyncStorage.getItem('saveuser').then((res) => {
        const getInfo = JSON.parse(res);
        setFilial(_filial.data.branches);
        if (getInfo) {
          setStorage({
            select1: getInfo.select1,
            select2: getInfo.select2,
          });
          _filial.data.branches.forEach((element) => {
            element.Name === getInfo.select1 &&
              setSelectedValue(getInfo.select1);
          });
          setAuth(getInfo.password);

          setFilialId(
            _filial.data.branches.find((elem) => {
              return elem.Name === getInfo.select1;
            }).UIDBranch,
          );
        }
      });
      setLoad2(false);
    }
    _getData();

    return () => FingerprintScanner.release();
  }, []);
  const authLegacy = (password) => {
    FingerprintScanner.authenticate({title: 'Войти с помощью биометрии'})
      .then(() => {
        handleLogin(password);
      })
      .catch((error) => {
        console.log(error.biometric);
        console.log(error.message);
      });
  };

 
  useEffect(() => {
    setLoad(true);

    if (filialId) {
      async function _getData() {
        const _user = await getRequest(`users/${filialId}`);
        setUser(_user.data.users);
        _user.data.users.forEach((element) => {
          if (element.Name === storage.select2) {
            setSelectedValue2(storage.select2);
            setUserId(element.UIDUser);
          }
        });
      }
      setLoad(false);
      _getData();
    }
  }, [filialId]);
  useEffect(() => {
    auth && userId && authLegacy(auth);
  }, [userId]);

  const handleLogin = (pass) => {
    const psd = pass ? pass : password;
    console.log(userId, '  pass ');
    if (filialId && userId) {
      setLoad3(true);
      getRequest('auth', userId, psd)
        .then((res) => {
          if (res.status === 200) {
            if (selectedValue && selectedValue2 && !pass) {
              SaveLogin();
            }
            Storage.setData({userId, password: psd});
            Storage.setUserName(selectedValue2);
            navigation.navigate('Dashboard');
          }
          setLoad3(false);
        })
        .catch((err) => {
          alert('неправильный пароль');
          setLoad3(false);
        });
    } else {
      alert('пожалуйста, выберите филиал и агента');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        t.absolute,
        t.inset0,
        t.p4,
        {flex: 1, backgroundColor: '#FAFAFA'},
      ]}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            padding: 24,
            flex: 1,

            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {shoykeyb ? (
            <View />
          ) : (
            <Image
              style={(styles.tinyLogo, [t.m10, t.selfCenter])}
              source={require('../assets/Logo.png')}
            />
          )}

          <InputForm
            type={true}
            baseValue={filial}
            setFilialId={setFilialId}
            load2={load2}
            iconType={'location'}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          <InputForm
            setUserId={setUserId}
            selectedValue2={selectedValue2}
            setSelectedValue2={setSelectedValue2}
            type={false}
            load={load}
            setLoad={setLoad}
            baseValue={user}
            iconType={'user'}
          />
          <InputPassword
            iconType={'lock'}
            value={password}
            plaseholderText={'Пароль'}
            onChangeText={(password) => setPassword(password)}
          />
          <View
            style={{
              marginBottom: 30,
              flex: 1,
              flexDirection: 'column-reverse',
            }}>
            <TouchableOpacity
              style={styles.login}
              onPress={() => handleLogin()}>
              <Text style={styles.textLogin}>
                {load3 ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  'Войти'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
