import React from 'react';
import {t} from 'react-native-tailwindcss';
import {View, Text, TouchableOpacity} from 'react-native';

const FinalWrupDown = ({orderPush}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        flex: 1,
        backgroundColor: '#E5E5E5',
        paddingVertical: 40,
        paddingHorizontal: 40,
        borderRadius: 10,
      }}>
      <TouchableOpacity
        style={[
          t.bg,
          t.rounded,
          t.textWhite,
          t.wFull,
          {backgroundColor: '#2323C8', height: 40},
        ]}
        onPress={orderPush}>
        <Text style={[t.textCenter, t.mT2, {color: 'white'}]}>Готово</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalWrupDown;
