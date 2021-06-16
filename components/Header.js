import React, {useState} from 'react';
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {t} from 'react-native-tailwindcss';

const Header = ({
  icon1,
  icon2,
  icon3,
  text,
  eventHandler,
  navigation,
  setFilter,
  setSearch,
  filter,
  search,
  setShowfooter,
  handleCreateContractor,
}) => {
  return (
    <View style={[t.flex, t.flexRow, {backgroundColor: '#2323C8', marginBottom: 6, height: 60}]}>
      <TouchableOpacity style={[t.w1_4, t.p4]} onPress={eventHandler}>
        <Icon name={icon1} size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={[t.w2_4]}>
        {search ? (
          <TextInput
          color='#fff'
            value={filter}
            onChangeText={(value) => setFilter(value)}
            style={{borderBottomColor: '#fff', borderBottomWidth: 1}}
            placeholder="Search"
            placeholderTextColor = '#fff'
          />
        ) : (
          <Text
            style={[
              t.pY4,
              t.textLg,
              t.fontBold,
              t.textCenter,
              {fontFamily: 'Golos-text_Regular', color: '#fff'},
            ]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
      <View style={[t.w1_4, t.p4, t.flex, t.flexRow]}>
        <TouchableOpacity
          onPress={() => {
            setSearch(!search);
            setFilter('');
          }}>
          {search ? (
            <Icon name="close" size={32} color="#fff" />
          ) : (
            <Icon name={icon2} size={32} color="#fff" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={handleCreateContractor}>
          <Icon name={icon3} size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
