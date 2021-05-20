import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {t} from 'react-native-tailwindcss';

const FinalHeader = ({icon1, name}) => {
  return (
    <View style={[t.flex, t.flexRow, t.bgWhite, t.wFull]}>
      <TouchableOpacity style={[t.w1_4, t.p4]}>
        <Icon name={icon1} size={32} color="#2323C8" />
      </TouchableOpacity>
      <View
        style={[
          t.w2_4,
          t.pY4,
          t.textLg,
          t.fontBold,
          t.textCenter,
          {color: '#5B5B5B', flexDirection: 'column'},
        ]}>
        <Text style={[t.w4_5, {fontSize: 14}]}>{name}</Text>

        <Text style={[t.textCenter, t.mB4]}>Shartnoma</Text>

        <Text style={[t.textCenter, t.mB4]}>Narx turi</Text>

        <Text style={[t.textCenter, t.mB2]}>Ombor</Text>
      </View>
    </View>
  );
};

export default FinalHeader;
