import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    // marginBottom: 10,
    width: '90%',
    height: 'auto',
    borderRadius: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: '#000',
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
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
  },
});

const Input = ({
  placeholder,
  value,
  setValue,
  press,
  keyboardType,
  editable,
}) => {
  return (
      <View style={[styles.inputContainer, press && !value ? {borderColor: '#DD118F', borderWidth: 1,  borderRadius: 5} : {},]}>
      <TextInput
        editable={editable}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.nativeEvent.text)}
        keyboardType={keyboardType}
        multiline={true}
      />
    </View>
  );
};

export default Input;
