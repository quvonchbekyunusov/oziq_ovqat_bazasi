import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    // borderRightcolor: '#ccc',
    // borderRightWidth: 1,
    width: 50,
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
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 280,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});

const InputPassword = ({iconType, value, plaseholderText, onChangeText}) => {
  const [passIcon, setPassIcon] = useState('eye');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    if (secureTextEntry) {
      setPassIcon('eye');
    } else {
      setPassIcon('eye-off');
    }
  }, [secureTextEntry]);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Icon name={iconType} size={18} color="#5B5B5B" />
      </View>
      <TextInput
        value={value}
        style={styles.input}
        numberOfLines={1}
        placeholder={plaseholderText}
        placeholderTextColor="#666"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => setSecureTextEntry(!secureTextEntry)}>
        <FeatherIcon name={passIcon} size={18} color="#5B5B5B" />
      </TouchableOpacity>
    </View>
  );
};

export default InputPassword;
