import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    // marginBottom: 10,
    justifyContent: 'center',
    width: 280,
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 'auto',
    marginBottom: 10,
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
const activityIndicator = () => {
  <ActivityIndicator size="small" color="red" />;
};

const InputForm = ({
  iconType,
  baseValue,
  type,
  setUserId,
  setFilialId,
  setSelectedValue2,
  selectedValue2,
  setSelectedValue,
  selectedValue,
  load,
  load2,
  setLoad,
}) => {
  const onValueChangeHandler = (itemValue, itemIndex) => {
    type ? setSelectedValue(itemValue) : setSelectedValue2(itemValue);
    type
      ? setFilialId(baseValue[itemIndex - 1]?.UIDBranch)
      : setUserId(baseValue[itemIndex - 1]?.UIDUser);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Icon name={iconType} size={18} color="#5B5B5B" />
      </View>
      {type === true ? (
        <Picker
          style={styles.input}
          placeholderTextColor="#666"
          selectedValue={selectedValue}
          onValueChange={onValueChangeHandler}>
          <Picker.Item label="Filialni tanlang" value={0} />
          {load2 ? (
            <Picker.Item label="Yuklanmoqda..." value={0} />
          ) : (
            baseValue.map((item) => (
              <Picker.Item
                label={item.Name}
                value={item.Name}
                key={item.UIDBranch}
              />
            ))
          )}
        </Picker>
      ) : (
        <Picker
          style={styles.input}
          placeholderTextColor="#666"
          selectedValue={selectedValue2}
          onValueChange={onValueChangeHandler}>
          <Picker.Item label="Agentni tanlang" value={0} />
          {load ? (
            <Picker.Item label="Yuklanmoqda..." value={0} />
          ) : (
            baseValue.map((item) => (
              <Picker.Item
                label={item.Name}
                value={item.Name}
                key={item.UIDUser}
              />
            ))
          )}
        </Picker>
      )}
    </View>
  );
};

export default InputForm;
