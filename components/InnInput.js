import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';


const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    // justifyContent: 'center',
    // borderRightcolor: '#ccc',
    // borderRightWidth: 1,
    width: 50,
  },
  input: {
    width: '85%',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
  },
});

const InnInput = ({
  placeholder,
  value,
  setValue,
  press,
  keyboardType,
  handleInn,
  loader2 
}) => {
  return (
    <View style={[styles.inputContainer, 
      press && !value ? {borderColor: '#DD118F', borderWidth: 1, borderRadius: 5} : {},]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.nativeEvent.text)}
        keyboardType={keyboardType}
        multiline={true}
      />
        <TouchableOpacity onPress={handleInn} style={styles.iconStyle}>
           {loader2 ? <ActivityIndicator size = 'small' color='blue' /> : <Icon name="plussquare" size={30} color="#2323C8" />}
        </TouchableOpacity>
    </View>
  );
};

export default InnInput;
